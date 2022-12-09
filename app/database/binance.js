import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { useState,useEffect, createContext } from 'react'
import strategies from './strategies';

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
            S:i.filters[0].minPrice,
            L:i.filters[0].maxPrice}
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
        setDues(arr.map(i=>{
            return(i)
        }))
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
    
    // GET CRYPTO CURRENT PRICE

    const getPrice = async (ticker) =>{
        const response = await fetch('https://api.binance.com/api/v3/avgPrice?symbol='+ticker+'USDT')
        const dataCur = await response.json();
        return(dataCur)
    }

    // GET OPTION PRICE

    const getOptPrice = async (symbol) =>{
        const response = await fetch('https://eapi.binance.com/eapi/v1/mark?symbol='+symbol)
        const dataOpt = await response.json();
        return(dataOpt)
    }
    // SELECTED OPTION PRICES
    const [options,setOptions] = useState([])
    const getOptions = (selectedItems)=>{
        const str = selectedItems.str
        const due = selectedItems.due
        const ticker = selectedItems.ticker
        const selectedStrategy=[]
        strategies.forEach((i)=>{
            if (i.name==str){
                i.options.forEach((x)=>{
                    selectedStrategy.push(x)
                })
            }
        })
        rawData.forEach((i)=>{
            if(i.underlying==(ticker+'USDT')){
                if (i.symbol.split('-')[1]==due){
                    getPrice(ticker).then(dataCur=>(
                        selectedStrategy.forEach((x)=>{
                            const type = x.type
                            const mony = x.mony
                            const pos = x.pos
                            const id = x.id
                            if (i.symbol.split('-')[3]==type){
                                getOptPrice(i.symbol).then(dataOpt=>{
                                    const underlying = dataCur.price
                                    const strike = i.symbol.split('-')[2]
                                    const market = dataOpt[0].markPrice
                                    console.log(ticker,due,type,pos,underlying,strike,market,mony,id)

                                })
                            }
                            
                        })            
                    ))
                }
            }
        })
        }
    
    return(
        <Binance.Provider value={{binanceData,tickers,getDues,dues,options,getOptions}}>
            {props.children}
        </Binance.Provider>
    )
}

export default BinanceProvider