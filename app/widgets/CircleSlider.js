import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import CircleSlider from 'react-native-circle-slider'

export default class CircleSli extends Component {
    render() {
        return (
            <View style={styles.container}>
                <CircleSlider
                    dialRadius={100}
                    dialWidth={15}
                    btnRadius={20}
                    meterColor={'#385f71'}
                    fillColor={'#f0c782'}
                    strokeWidth={10}
                    strokeColor={'#fff8dc'}
                    onValueChange={x => console.log(x)}
                    value={90}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0c782',
        alignItems: 'center',
        justifyContent: 'center'
    }
})