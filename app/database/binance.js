import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { useState,useEffect, createContext } from 'react'
import strategies from './strategies';
import BinanceFunctions from '../functions/binanceFunctions';

export const Binance = createContext();

const BinanceProvider = (props)=>{
    // GETS A CRYPTO CURRENCIES CURRENT PRICE
    const getPrice = async (ticker) =>{
        const response = await fetch('https://api.binance.com/api/v3/avgPrice?symbol='+ticker+'USDT')
        const dataCur = await response.json();
        return(dataCur.price)
    }
    // GETS OPTION PRICE FOR SYMBOL
    const getOptPrice = async (symbol) =>{
        try{
            const response = await fetch('https://eapi.binance.com/eapi/v1/mark?symbol='+symbol)
            const dataOpt = await response.json()
            return(dataOpt[0].markPrice)
        }catch{console.log('error on getOptPrice')}
    }
    // GET EXCHANGE INFO
    const [rawData,setRawData] = useState([])
    useEffect(()=>{
        fetch('https://eapi.binance.com/eapi/v1/exchangeInfo')
        .then(res=>res.json())
        .then(x => setRawData(x.optionSymbols))
    },[])  
    // FILTERS EXCHANGE INFO
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
    // FETCHES TICKERS
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

    // FETCHES DUE DATES
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
    
    // SELECTED TICKER,DUE,STRATEGY
    const [selectedDue,setSelectedDue] = useState(null)
    const [selectedTicker,setSelectedTicker] = useState(null)
    const [selectedStrategy,setSelectedStrategy] = useState(null)

    const [potentialOptions,setPotentialOptions] = useState(null)
    useEffect(()=>{
        if (selectedDue && selectedTicker){
            x = BinanceFunctions.getPotentialOptions(rawData,selectedDue,selectedTicker)
            setPotentialOptions(x)
        }
        
    },[selectedDue,selectedTicker,selectedStrategy])

    const [potentialStrikes,setPotentialStrikes] = useState(null)
    useEffect(()=>{
        if (potentialOptions){
            x = BinanceFunctions.getPotentialStrikes(potentialOptions)
            setPotentialStrikes(x)
        }
    },[potentialOptions])
    
    const [selectedStrikes,setSelectedStrikes] = useState(null)
    useEffect(()=>{
        const go = async ()=>{
            if (potentialStrikes && selectedStrategy){
                const underlying = await getPrice(selectedTicker)
                const x = BinanceFunctions.selectStrikePrices(underlying,potentialStrikes,selectedStrategy)
                setSelectedStrikes(x)
            }
        }
        go()
    },[potentialStrikes])
    
    const [selectedTypes,setSelectedTypes] = useState(null)
    useEffect(()=>{
        const go = async()=>{
            if (selectedStrategy){
                x = await BinanceFunctions.selectTypes(selectedStrategy)
                setSelectedTypes(x)
            }
        }
        go()
    },[selectedStrategy])

    const [selectedPositions,setSelectedPositions] = useState(null)
    useEffect(()=>{
        if (selectedTypes){
            const x = BinanceFunctions.selectPositions(selectedStrategy)
            setSelectedPositions(x)
        }
    },[selectedTypes])

    const [selectedCosts,setSelectedCosts] = useState(null)
    useEffect(()=>{
        setSelectedCosts(null)
        const go = async ()=>{
            if (selectedTypes && selectedStrikes && selectedStrategy){
                const x = await BinanceFunctions.selectCosts(getOptPrice,selectedTicker,selectedDue,selectedStrikes,selectedTypes,selectedPositions)
                const y = await (JSON.parse(x))
                setSelectedCosts(y)
            }
        }
        go()
    },[selectedTypes,selectedStrikes,selectedStrategy])
    
    return(
        <Binance.Provider value={{tickers,
        getDues,dues,
        setSelectedDue,selectedDue,
        setSelectedTicker,selectedTicker,
        setSelectedStrategy,selectedStrategy,
        selectedCosts,selectedStrikes}}>
            {props.children}
        </Binance.Provider>
    )
}

export default BinanceProvider