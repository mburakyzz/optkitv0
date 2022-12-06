import { View, Text, Dimensions,StyleSheet } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-gifted-charts'
import color from '../color'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Donut({ data }) {
    return (
        <View style={styles.container}>
            <PieChart
                data={data}
                donut
                initialAngle={0}
                radius={windowWidth * 200 / 844 / 2}
                innerRadius={(windowWidth * 200 / 844 / 2) * 3 / 4}
                innerCircleColor={color.lightBlue}
                shadow
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        left:17.5*windowWidth/844/2
    }
})

export default Donut