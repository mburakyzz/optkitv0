import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { useState,useEffect, createContext } from 'react'


export const Binance = createContext();

const BinanceProvider = (props)=>{
    // Get Data
    const [rawData,setRawData] = useState([])
    useEffect(()=>{
        fetch('https://eapi.binance.com/eapi/v1/exchangeInfo')
        .then(res=>res.json())
        .then(x => setRawData(x.optionSymbols))
    },[])  
    // Ordered Data
    const [binanceData,setBinanceData] = useState([])
    useEffect(()=>{
        [setBinanceData(rawData.map((i)=>{
            return {id:i.id,
            symbol:i.symbol.split('-')[0],
            due:i.symbol.split('-')[1],
            strike:i.symbol.split('-')[2],
            type:i.symbol.split('-')[3],
            min:i.filters[0].minPrice,
            max:i.filters[0].maxPrice}
        }))]
    },[rawData])
    // Tickers
    const[tickersData,setTickersData] = useState([])
    const getTickers = ()=>{
        for (i=0;i<binanceData.length;i++){
            if (!tickersData.includes(binanceData[i].symbol)){
                setTickersData([...tickersData,binanceData[i].symbol])
            }
        }
    }
    getTickers()
    const [tickers,setTickers] = useState([])
    useEffect(()=>{
        setTickers(tickersData.map(i=>{
            return({
                id:tickersData.indexOf(i)+1,
                symbol:i
            })
        }))
    },[tickersData])

    // DUE DATES
    const[dues,setDues] = useState([])
    const getDues = (x)=>{
        const arr = []
        binanceData.forEach((i)=>{
            if (i.symbol==x){
                if(!arr.includes(i.due)){
                   arr.push(i.due)
                }
            }
        })
        setDues(arr)
        }
    // SELECTED ITEMS
    const[selectedAssets,setSelectedAssets] = useState([])
    const getAssets = (x,y)=>{
        const arr = []
        binanceData.forEach((i)=>{
            if (i.symbol==x){
                if(!arr.includes(i.due)){
                   arr.push(i.due)
                }
            }
        })
        setSelectedAssets(arr)
        }
    
    
    return(
        <Binance.Provider value={{binanceData,tickers,getDues,dues}}>
            {props.children}
        </Binance.Provider>
    )
}

export default BinanceProvider