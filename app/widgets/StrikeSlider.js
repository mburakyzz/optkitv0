import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Slider from '@react-native-community/slider'
import color from '../color'

const StrikeSlider = (props) => {
    const [value,setValue] = useState([0,0,0,0])
    const [data,setData] = useState([])
    useEffect(()=>{
        const go = async()=>{
            strikes = []
            strike = JSON.parse(props.strikes)
            for await(i of strike){
                strikes.push({id:strike.indexOf(i),strike:i.length})
            }
            setData(strikes)
        }
        go()
    },[value])

    const setStrike = (key,newValue)=>{
        newData = value
        newData[key] = newValue
        setValue(newData)
        console.log(value)
    }
    const w = 600/data.length
    output = []
    for (i of data){
        const key = i.id
        output.push(
            <View style = {{position:'absolute',bottom:0,left:key*w}}>
                <Slider
                    style={{width: w, height: 40}}
                    minimumValue={0}
                    maximumValue={i.strike-1}
                    step= {1}
                    minimumTrackTintColor={color.darkBlue}
                    maximumTrackTintColor="#000000"
                    onValueChange={(x)=>setStrike(key,x)}
                    thumbImage={require('../assets/strike.png')}/>
            </View>
        )
    }
    return(output)
}

export default StrikeSlider

const styles = StyleSheet.create({})