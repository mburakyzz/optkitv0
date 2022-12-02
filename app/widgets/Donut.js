import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-gifted-charts'
import color from '../color'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Donut({ data }) {
    return (
        <View>
            <PieChart
                data={data}
                donut
                initialAngle={0}
                radius={windowWidth * 235 / 844 / 2}
                innerRadius={(windowWidth * 235 / 844 / 2) * 3 / 4}
                innerCircleColor={color.lightBlue}
                shadow
            />
        </View>
    )
}

export default Donut