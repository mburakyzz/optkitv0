import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { Component } from 'react'
import color from '../color'

export default class HomePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/cups.png')} style={styles.cups} />
                <View style={styles.cups_container}>
                    <View style={styles.cup_container}>
                        <Image source={require('../assets/crystal_small.png')} />
                        <Text style={styles.cup_txt}>133</Text>
                    </View>
                    <View style={styles.cup_container}>
                        <Image source={require('../assets/gold_small.png')} />
                        <Text style={styles.cup_txt}>133</Text>
                    </View>
                    <View style={styles.cup_container}>
                        <Image source={require('../assets/silver_small.png')} />
                        <Text style={styles.cup_txt}>23</Text>
                    </View>
                    <View style={styles.cup_container}>
                        <Image source={require('../assets/bronze_small.png')} />
                        <Text style={styles.cup_txt}>133</Text>
                    </View>
                </View>
                <Image source={require('../assets/holder_cup.png')} style={styles.holder_cup} />
                <Image source={require('../assets/holder_chest.png')} style={styles.holder_chest} />
                <Image source={require('../assets/holder_return.png')} style={styles.holder_return} />
                <TouchableWithoutFeedback onPress={() => { console.log('league') }}>
                    <Image source={require('../assets/league.png')} style={styles.league} />
                </TouchableWithoutFeedback>
                <Text style={styles.league_txt}>LEAGUE</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cups: {
        top: '0%',
        position: 'absolute',
        alignSelf: 'center',
    },
    cups_container: {
        position: 'absolute',
        top: '0%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 340,
        height: 73
    },
    cup_container: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column'
    },
    cup_txt: {
        fontSize: 18,
        fontFamily: 'Baloo-Regular',
        color: color.honey
    },
    holder_cup: {
        top: '20%',
        position: 'absolute',
        alignSelf: 'baseline'
    },
    holder_chest: {
        top: '40%',
        position: 'absolute',
        alignSelf: 'baseline'
    },
    holder_return: {
        top: '60%',
        position: 'absolute',
        alignSelf: 'baseline'
    },
    league: {
        bottom: 10,
        left: 10,
        position: 'absolute'
    },
    league_txt: {
        position: 'absolute',
        left: 82,
        bottom: 10,
        fontSize: 25,
        fontFamily: 'Baloo-Regular',
        color: color.mauve
    }
})