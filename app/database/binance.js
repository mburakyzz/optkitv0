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
    const[tickers,setTickers] = useState([])
    useEffect(()=>{
        binanceData.map((i)=>{
           if (!(tickers.includes(i.symbol))){
            setTickers([...tickers,i.symbol])
           };
        })
    },[binanceData])
    return(
        <Binance.Provider value={{binanceData,tickers}}>
            {props.children}
        </Binance.Provider>
    )
}

export default BinanceProvider