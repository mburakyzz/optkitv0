import { View, Text } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-gifted-charts'
import color from '../color'


function Donut({ data }) {
    return (
        <View>
            <PieChart
                data={data}
                donut
                initialAngle={0}
                radius={235 / 2}
                innerRadius={(235 / 2) * 3 / 4}
                innerCircleColor={color.lightBlue}
                shadow
            />
        </View>
    )
}

export default Donut