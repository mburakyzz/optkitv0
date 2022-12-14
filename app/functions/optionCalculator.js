import { createContext } from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Binance } from '../database/binance'

export const OptionCalculator = createContext()

const OptionCalculatorProvider = (props)=>{
    const { selectedCosts,selectedStrikes,selectedTypes,selectedPositions,selectedTicker,selectedDue } = useContext(Binance)
    const [currentValue,setCurrentValue] = useState(null)
    const selectedStrx = JSON.parse(selectedStrikes)
    if (currentValue){
        console.log('------------------------')
        console.log('CV: ' +currentValue[0])
        console.log('ST: '+ selectedTicker)
        console.log('SD: '+ selectedDue)
        console.log('SC: '+ selectedCosts)
        console.log('SX: '+ selectedStrx)
        console.log('SP: '+ selectedPositions)
        console.log('STY: '+ selectedTypes)
        console.log('------------------------')
    }
    useEffect(()=>{
        if(currentValue){
            for (item of selectedCosts){
                i = selectedCosts.indexOf(item)
                console.log(selectedCosts[i],selectedStrx[i],selectedTypes[i],selectedPositions[i])
            }
        }
    },[currentValue])
    return(
        <OptionCalculator.Provider value={{
            setCurrentValue
            }}>
            {props.children}
        </OptionCalculator.Provider>
    )
}

export default OptionCalculatorProvider