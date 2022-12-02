import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { Component } from 'react'
import color from '../color'
import Donut from '../widgets/Donut'

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
                <View style={styles.status_container}>
                    <View>
                        <Image source={require('../assets/holder_dollar.png')} />
                        <Image source={require('../assets/dollar.png')} style={styles.status_item} />
                        <Text style={styles.status_txt}>Sa</Text>
                    </View>
                    <View>
                        <Image source={require('../assets/holder_bullbear.png')} />
                        <Image source={require('../assets/bull.png')} style={styles.status_item} />
                        <Text style={styles.status_txt}>Saas</Text>
                    </View>
                    <View>
                        <Image source={require('../assets/holder_bullbear.png')} />
                        <Image source={require('../assets/bear.png')} style={styles.status_item} />
                        <Text style={styles.status_txt}>Sa</Text>
                    </View>
                </View>
                <Image source={require('../assets/holder_cup.png')} style={styles.holder_cup} />
                <Image source={require('../assets/holder_chest.png')} style={styles.holder_chest} />
                <Image source={require('../assets/holder_return.png')} style={styles.holder_return} />
                <TouchableWithoutFeedback onPress={() => { console.log('league') }}>
                    <Image source={require('../assets/league.png')} style={styles.league} />
                </TouchableWithoutFeedback>
                <Text style={styles.league_txt}>LEAGUE</Text>
                <View style={styles.donut}>
                    <Donut />
                </View>
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
    },
    status_container: {
        width: 183,
        height: 73,
        position: 'absolute',
        top: '0%',
        right: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    status_item: {
        top: '-100%',
        left: -7
    },
    status_txt: {
        top: -73,
        textAlign: 'center',
        fontFamily: 'Baloo-Regular',
        fontSize: 14,
        width: 36,
        height: 23
    },
    donut: {
        position: 'absolute',
        left: 160,
        top: 100,
        width: 235,
        height: 235
    },
})