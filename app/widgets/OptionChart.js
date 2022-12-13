import React from 'react'
import { AreaChart, Grid } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import color from '../color'

const OptionChart = () => {
    const data = [ -10, 0, 20, 20, 0, -10]
    const min = Math.min(...data)
    const max = Math.max(...data)
    const y2 = max/-min
    console.log(y2)

    const Gradient = ({ index }) => (
        <Defs key={index}>
            <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'133%'}>
                <Stop offset={'0%'} stopColor={color.green} stopOpacity={1} />
                <Stop offset={'100%'} stopColor={color.red} stopOpacity={1} />
            </LinearGradient>
        </Defs>
    )
    return (
        <AreaChart
            style={{ height: 300,width:600,left:0,position:'absolute' }}
            data={data}
            contentInset={{ top: 10, bottom: 10 }}
            svg={{ fill: 'url(#gradient)' }}
        >
            <Gradient />
        </AreaChart>
    )
}

export default OptionChart