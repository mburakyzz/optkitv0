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
        const response = await fetch('https://eapi.binance.com/eapi/v1/mark?symbol='+symbol)
        const dataOpt = await response.json();
        return([Number(dataOpt[0].markPrice)])
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
            BinanceFunctions.sa('potential options fireed')
            x = BinanceFunctions.getPotentialOptions(rawData,selectedDue,selectedTicker)
            setPotentialOptions(x)
        }
        
    },[selectedDue,selectedTicker,selectedStrategy])

    const [potentialStrikes,setPotentialStrikes] = useState(null)
    useEffect(()=>{
        if (potentialOptions){
            BinanceFunctions.sa('potential strikes fireed')
            x = BinanceFunctions.getPotentialStrikes(potentialOptions)
            setPotentialStrikes(x)
        }
    },[potentialOptions])
    
    const [selectedStrikes,setSelectedStrikes] = useState(null)
    useEffect(()=>{
        if (potentialStrikes && selectedStrategy){
            getPrice(selectedTicker).then(underlying=>{
                x = BinanceFunctions.selectStrikePrices(underlying,potentialStrikes,selectedStrategy)
                setSelectedStrikes(x)
            })
        }
    },[potentialStrikes])
    
    const [selectedTypes,setSelectedTypes] = useState(null)
    useEffect(()=>{
        if (selectedStrategy){
            x = BinanceFunctions.selectTypes(selectedStrategy)
            setSelectedTypes(x)
        }
    },[selectedStrategy])

    const [selectedPositions,setSelectedPositions] = useState(null)
    useEffect(()=>{
        if (selectedStrategy){
            x = BinanceFunctions.selectPositions(selectedStrategy)
            setSelectedPositions(x)
        }
    },[selectedStrategy])

    const [selectedCosts,setSelectedCosts] = useState(null)
    useEffect(()=>{
        if (selectedTypes && selectedStrikes && selectedStrategy){
            x = BinanceFunctions.selectCosts(getOptPrice,selectedTicker,selectedDue,selectedStrikes,selectedTypes)
            .then(()=>{
                setSelectedCosts(x)
            })

        }
    },[selectedTypes,selectedStrikes,selectedStrategy])
    
    return(
        <Binance.Provider value={{tickers,
        getDues,dues,
        setSelectedDue,selectedDue,
        setSelectedTicker,selectedTicker,
        setSelectedStrategy,selectedStrategy,
        selectedCosts}}>
            {props.children}
        </Binance.Provider>
    )
}

export default BinanceProvider