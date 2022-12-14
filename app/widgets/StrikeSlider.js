import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Slider from '@react-native-community/slider'
import color from '../color'
import { useContext } from 'react'
import { OptionCalculator } from '../functions/optionCalculator'

const StrikeSlider = (props) => {
    const [value,setValue] = useState([0,0,0,0])
    const [data,setData] = useState([])
    const {setCurrentValue} = useContext(OptionCalculator)
    useEffect(()=>{
        const go = async()=>{
            if (props.strikes.length>0){
                strikes = []
                strike = JSON.parse(props.strikes)
                for await(i of strike){
                    console.log(strike.indexOf(i))
                    strikes.push({id:strike.indexOf(i),strike:i.length})
                }
                setData(strikes)
            }
        }
        go()
    },[value])

    const setStrike = (key,newValue)=>{
        newData = value
        newData[key] = newValue
        setValue(newData)
    }
    const w = 600/data.length
    output = []
    for (i of data){
        const key = i.id
        output.push(
            <View style = {{position:'absolute',bottom:0,left:key*w}} key={key}>
                <Slider
                    style={{width: w, height: 40}}
                    minimumValue={0}
                    maximumValue={i.strike-1}
                    disabled = {i.strike-1<1 ? true:false}
                    step= {1}
                    minimumTrackTintColor={color.darkBlue}
                    maximumTrackTintColor="#000000"
                    onValueChange={(x)=>[setStrike(key,x),setCurrentValue([value])]}
                    key={key}
                    thumbImage={require('../assets/strike.png')}/>
            </View>
        )
    }
    return(output)
}

export default StrikeSlider

const styles = StyleSheet.create({})