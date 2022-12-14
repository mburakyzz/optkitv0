import React, { useContext, useEffect } from 'react'
import { AreaChart, Grid } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import color from '../color'
import { OptionCalculator } from '../functions/optionCalculator'
import { View } from 'react-native'

const OptionChart = () => {
    const {range,returns} = useContext(OptionCalculator)
    if (returns){
        const data = [ -10, -10, -5, 0, 5, 10]
        const min = Math.abs(Math.min(...returns))
        const max = Math.max(...returns)
        const y2 = (100*(max-min)/(max+min))+100+'%'

        const Gradient = ({ index }) => (
            <Defs key={index}>
                <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={y2}>
                    <Stop offset={'0%'} stopColor={color.green} stopOpacity={1} />
                    <Stop offset={'100%'} stopColor={color.red} stopOpacity={1} />
                </LinearGradient>
            </Defs>
        )
        return (
            <AreaChart
                style={{ height: 300,width:600,left:0,position:'absolute' }}
                data={returns}
                key = {range}
                contentInset={{ top: 10, bottom: 10 }}
                svg={{ fill: 'url(#gradient)' }}
            >
                <Gradient />
            </AreaChart>
        )
    }
}

export default OptionChart