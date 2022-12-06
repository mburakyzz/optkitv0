import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CircularSlider from 'rn-circular-slider'

console.disableYellowBox = true

const CircleSlider = () =>  {
    const [state,setState] = useState({value:50})

    const { value } = state
    return (
        <View style={styles.container}>
            <CircularSlider
                step={1}
                min={0}
                max={100}
                value={value}
                backgroundTrackColor={'#b3e580'}
                onChange={value => setState({ value })}
                contentContainerStyle={styles.contentContainerStyle}
                strokeWidth={15}
                buttonBorderColor="#648495"
                buttonFillColor="#385f71"
                buttonStrokeWidth={10}
                openingRadian={Math.PI / 4}
                buttonRadius={15}
                linearGradient={[{ stop: '0%', color: '#8963ba' }, { stop: '100%', color: '#8963ba' }]}
            >
                <Text style={styles.value}>{value + ' %'}</Text>
                <Text style={styles.ofcash}>OF CASH</Text>
            </CircularSlider>
        </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0c782',
    },
    contentContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    value: {
        fontWeight: '500',
        fontSize: 32,
        color: '#385f71',
        textAlign: 'center'
    },
    ofcash: {
        fontWeight: '300',
        fontSize: 20,
        color: '#385f71',
        textAlign: 'center'
    }
});

export default CircleSlider