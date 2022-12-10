import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { useState,useEffect, createContext } from 'react'
import strategies from './strategies';
import { resolvePlugin } from '@babel/core';

export const Binance = createContext();

const BinanceProvider = (props)=>{
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

    // GETS SELECTED TICKER,DUE AND STRATEGY FROM UI
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
    // SELECTED OPTION PRICES
    const [options,setOptions] = useState([])
    const getOptions = async (selectedItems)=>{
        // VARIABLES
        const str = selectedItems.str
        const due = selectedItems.due
        const ticker = selectedItems.ticker
        const underlyingPrice = await getPrice(ticker)

        // GETS THE SELECTED STRATEGY FROM strategy.js
        const selectedStrategy=[]
        strategies.forEach((i)=>{
            if (i.name==str){
                i.options.forEach((x)=>{
                    selectedStrategy.push(x)
                })
            }
        })

        // GETS BINANCE OPTIONS TICKERS THAT ARE AVAILABLE
        const potentialOptions = []
        rawData.forEach((i)=>{
            if(i.underlying==(ticker+'USDT')){
                if (i.symbol.split('-')[1]==due){
                    potentialOptions.push(i.symbol)
                }
            }
        })

        // FETCHES THE STRIKE PRICES FROM POTENTIAL OPTIONS
        const potentialStrikes = []
        potentialOptions.forEach(x=>{
            const strikePrice = Number(x.split('-')[2])
            if (!potentialStrikes.includes(strikePrice)){
                potentialStrikes.push(strikePrice)
            }
        })
        potentialStrikes.sort(function(a, b) {return a - b;})

        // FILTERS THE MONYNESS OF EACH STRATEGY IN POTENTIAL STRIKES AND RETURNS [[],[],[]...]
        const selectedStrikes = []
        const max = Math.max(...potentialStrikes)
        const min = Math.min(...potentialStrikes)
        const maxStep = (max-underlyingPrice)/5
        const minStep = (underlyingPrice-min)/5
        const firstMony = potentialStrikes.filter(x => x <= min+2*minStep && x>=min);
        const secondMony = potentialStrikes.filter(x => x <= min+4*minStep && x > min+2*minStep);
        const thirdMony = potentialStrikes.filter(x => x > min+4*minStep && x < max-4*maxStep);
        const fourthMony = potentialStrikes.filter(x => x >= max-4*maxStep && x <= max-2*maxStep);
        const fifthMony = potentialStrikes.filter(x =>  x > max-4*maxStep);
        
        selectedStrategy.forEach(x=>{
            const arr2 = []
            if (x.mony.includes(1)){
                firstMony.forEach(x=>arr2.push(x))
            }
            if (x.mony.includes(2)){
                secondMony.forEach(x=>arr2.push(x))
            }
            if (x.mony.includes(3)){
                thirdMony.forEach(x=>arr2.push(x))
            }
            if (x.mony.includes(4)){
                fourthMony.forEach(x=>arr2.push(x))
            }
            if (x.mony.includes(5)){
                fifthMony.forEach(x=>arr2.push(x))
            }
            selectedStrikes.push(arr2)
        })    
         // FILTERS THE TYPE OF EACH STRATEGY IN POTENTIAL STRIKES AND RETURNS [[],[],[]...]
        const selectedTypes =[]
        selectedStrategy.forEach(x=>{
            selectedTypes.push([x.type])
        }) 
        // FILTERS THE POSITION OF EACH STRATEGY IN POTENTIAL STRIKES AND RETURNS [[],[],[]...]
        const selectedPositions =[]
        selectedStrategy.forEach(x=>{
            selectedPositions.push([x.pos])
        }) 
        // GETS THE COSTS FOR SELECTED STRIKES
        const selectedCosts = []
        for (i=0;i<selectedStrikes.length;i++){
            arr = []
            for (j=0;j<selectedStrikes[i].length;j++){
                const symbol = ticker+'-'+due+'-'+selectedStrikes[i][j]+'-'+selectedTypes[i]
                arr.push(await getOptPrice(symbol))
            }
            selectedCosts.push(arr)
        }
        console.log('Costs: '+[selectedCosts])
        console.log('Strikes: '+[selectedStrikes])
        console.log('Types: '+[selectedTypes])
        console.log('Positions: '+[selectedPositions])
        console.log('Due: '+[due])
        console.log('ticker: '+[ticker])
        
    }
    
    return(
        <Binance.Provider value={{binanceData,tickers,getDues,dues,options,getOptions}}>
            {props.children}
        </Binance.Provider>
    )
}

export default BinanceProvider


// const filterStrikes = (x)=>{
//     const arr = []
//     const maxStep = (Math.max(...potentialStrikes)-underlyingPrice)/5
//     const minStep = (underlyingPrice-Math.min(...potentialStrikes))/5
//     for (i=0;i<potentialStrikes.length;i++){
//         if (x.mony.includes(1) && potentialStrikes[i]<underlyingPrice-3*minStep){
//             arr.push(potentialStrikes[i])
//         }
//         if (x.mony.includes(2) && potentialStrikes[i]<underlyingPrice-1*minStep && potentialStrikes[i]>=underlyingPrice-3*minStep ){
//             arr.push(potentialStrikes[i])
//         }
//         if (x.mony.includes(3) && potentialStrikes[i]<underlyingPrice+maxStep && potentialStrikes[i]>=underlyingPrice-minStep ){
//             arr.push(potentialStrikes[i])
//         }
//         if (x.mony.includes(4) && potentialStrikes[i]<underlyingPrice+3*maxStep && potentialStrikes[i]>=underlyingPrice+maxStep ){
//             arr.push(potentialStrikes[i])
//         }
//         if (x.mony.includes(5) && potentialStrikes[i]>=underlyingPrice+3*maxStep ){
//             arr.push(potentialStrikes[i])
//         }
//     }
//     return (arr)    
    
// }

// const getIt = await selectedStrategy.forEach(x=>{filterStrikes(x)})
// getIt()
