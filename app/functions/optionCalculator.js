import { createContext } from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Binance } from '../database/binance'

export const OptionCalculator = createContext()

const OptionCalculatorProvider = (props)=>{
    const { selectedCosts,selectedStrikes,selectedTypes,selectedPositions,selectedTicker,selectedDue,potentialStrikes } = useContext(Binance)
    const [currentValue,setCurrentValue] = useState(null)
    const [range,setRange] = useState(null)
    const [returns,setReturns] = useState(null)
    const selectedStrx = JSON.parse(selectedStrikes)
    if (currentValue){
        console.log('START')
        console.log('------------------------')
        console.log('CV: ' +currentValue[0])
        console.log('ST: '+ selectedTicker)
        console.log('SD: '+ selectedDue)
        console.log('SC: '+ selectedCosts)
        console.log('SX: '+ selectedStrx)
        console.log('SP: '+ selectedPositions)
        console.log('STY: '+ selectedTypes)
        console.log('PStrx: '+potentialStrikes )
        console.log('------------------------')
    }
    var getRange = function(start, stop, step){
        step = step || 1;
        var arr = [];
        for (var i=start;i<stop;i+=step){
           arr.push(i);
        }
        return arr;
    }
    useEffect(()=>{
        if(currentValue){
            const min = Math.min(...potentialStrikes)/1.25
            const max = Math.max(...potentialStrikes)*1.25
            const range = getRange(min,max,1)
            const returns = []
            for (item of selectedCosts){
                i = selectedCosts.indexOf(item)
                const prime = selectedCosts[i][currentValue[0][i]]
                const strike = selectedStrx[i][currentValue[0][i]]
                const type = selectedTypes[i]
                const pos = selectedPositions[i]
                console.log('Cost: '+prime)
                console.log('Strx: '+strike)
                console.log('Type: '+type)
                console.log('Pos: '+pos)
                console.log('I: '+i)
                console.log('------------------------')
                arr = []
                for (realizedPrice of range){
                    if (type=='C'){
                        if (pos=='L'){
                            if (strike>realizedPrice){arr.push(Number(-prime))}else{arr.push(Number(realizedPrice-strike-prime))}
                        }else{if (strike>realizedPrice){arr.push(Number(prime))}else{arr.push(Number(prime-realizedPrice+strike))}}
                    }else{
                        if (pos=='L'){
                            if (strike>realizedPrice){arr.push(Number(strike-realizedPrice-prime))}else{arr.push(Number(-prime))}
                        }else{if (strike>realizedPrice){arr.push(Number(prime-strike+realizedPrice))}else{arr.push(Number(prime))}}
                    }
                    
                }
                returns.push(arr)
            }
            const calculatedReturn = returns[0].map((x, idx) => returns.reduce((sum, curr) => sum + curr[idx], 0))

            setRange(range)
            setReturns(calculatedReturn)
            // console.log('Range: '+range)
            // console.log('Return: '+calculatedReturn)
        }
    },[currentValue])
    return(
        <OptionCalculator.Provider value={{
            setCurrentValue,
            range,returns
            }}>
            {props.children}
        </OptionCalculator.Provider>
    )
}

export default OptionCalculatorProvider