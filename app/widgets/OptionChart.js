import React from 'react'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import color from '../color'

const OptionChart = () => {
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
    const fill = (y)=>{if(y>0){return(color.green)}else{return(color.red)}}
    return (
        <AreaChart
            style={{ height: 300 ,width:600,position:'absolute',left:0}}
            data={data}
            keys={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]}
            contentInset={{ top: 30, bottom: 30 }}
            svg={{ fill:fill(1) }}
        >
        </AreaChart>
    )
}

export default OptionChart