import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React, { Component } from 'react'
import color from '../color'
import Donut from '../widgets/Donut'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


// DONUT DATA
const data = [{ value: 10 }, { value: 80 }, { value: 90 }, { value: 70 }]
//


export default class HomePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/cups.png')} style={styles.cups} />
                <View style={styles.cups_container}>
                    <View style={styles.cup_container}>
                        <Image source={require('../assets/crystal_small.png')} style={styles.cup_item} />
                        <Text style={styles.cup_txt}>133</Text>
                    </View>
                    <View style={styles.cup_container}>
                        <Image source={require('../assets/gold_small.png')} style={styles.cup_item} />
                        <Text style={styles.cup_txt}>133</Text>
                    </View>
                    <View style={styles.cup_container}>
                        <Image source={require('../assets/silver_small.png')} style={styles.cup_item} />
                        <Text style={styles.cup_txt}>23</Text>
                    </View>
                    <View style={styles.cup_container}>
                        <Image source={require('../assets/bronze_small.png')} style={styles.cup_item} />
                        <Text style={styles.cup_txt}>133</Text>
                    </View>
                </View>
                <View style={styles.status_container}>
                    <View>
                        <Image source={require('../assets/holder_dollar.png')} style={styles.status_holder} />
                        <Image source={require('../assets/dollar.png')} style={styles.status_item} />
                        <Text style={styles.status_txt}>Sa</Text>
                    </View>
                    <View>
                        <Image source={require('../assets/holder_bullbear.png')} style={styles.status_holder} />
                        <Image source={require('../assets/bull.png')} style={styles.status_item} />
                        <Text style={styles.status_txt}>Saas</Text>
                    </View>
                    <View>
                        <Image source={require('../assets/holder_bullbear.png')} style={styles.status_holder} />
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
                <TouchableWithoutFeedback onPress={() => { console.log('market') }}>
                    <Image source={require('../assets/market.png')} style={styles.market} />
                </TouchableWithoutFeedback>
                <Text style={styles.market_txt}>MARKET</Text>
                <View style={styles.donut}>
                    <Donut data={data} />
                    <Text style={styles.donut_txt}>$ XXX.XX</Text>
                </View>
                <Text style={styles.account}>TERRAROSSA</Text>
                <View style={styles.asset_list}>

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
        width: 340 * windowWidth / 844,
        height: 73 * windowWidth / 844
    },
    cups_container: {
        position: 'absolute',
        top: '0%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 340 * windowWidth / 844,
        height: 73 * windowWidth / 844
    },
    cup_container: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column'
    },
    cup_item: {
        width: 39 * windowWidth / 844,
        height: 39 * windowWidth / 844
    },
    cup_txt: {
        fontSize: 18 * windowWidth / 844,
        fontFamily: 'Baloo-Regular',
        bottom: 5 * windowWidth / 844,
        color: color.honey
    },
    holder_cup: {
        top: '20%',
        position: 'absolute',
        alignSelf: 'baseline',
        width: 200 * windowWidth / 844,
        height: 29 * windowWidth / 844
    },
    holder_chest: {
        top: '40%',
        position: 'absolute',
        alignSelf: 'baseline',
        width: 150 * windowWidth / 844,
        height: 29 * windowWidth / 844
    },
    holder_return: {
        top: '60%',
        position: 'absolute',
        alignSelf: 'baseline',
        width: 150 * windowWidth / 844,
        height: 29 * windowWidth / 844
    },
    league: {
        bottom: 10 * windowWidth / 844,
        left: 10 * windowWidth / 844,
        position: 'absolute',
        width: 75 * windowWidth / 844,
        height: 75 * windowWidth / 844
    },
    league_txt: {
        position: 'absolute',
        left: 82 * windowWidth / 844,
        bottom: 10 * windowWidth / 844,
        fontSize: 25 * windowWidth / 844,
        fontFamily: 'Baloo-Regular',
        color: color.mauve
    },
    status_container: {
        width: windowWidth * 183 / 844,
        height: 73 * windowWidth / 844,
        position: 'absolute',
        top: '0%',
        right: 7 * windowWidth / 844,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    status_holder: {
        width: 36 * windowWidth / 844,
        height: 73 * windowWidth / 844,
    },
    status_item: {
        top: '-100%',
        left: -7 * windowWidth / 844,
        width: 50 * windowWidth / 844,
        height: 50 * windowWidth / 844
    },
    status_txt: {
        top: -77 * windowWidth / 844, // 73 normalde
        textAlign: 'center',
        fontFamily: 'Baloo-Regular',
        fontSize: 14 * windowWidth / 844,
        width: 36 * windowWidth / 844,
        height: 23 * windowWidth / 844
    },
    donut: {
        position: 'absolute',
        left: 180 * windowWidth / 844,
        top: 100 * windowWidth / 844,
        width: windowWidth * 235 / 844,
        height: windowWidth * 235 / 844,
    },
    donut_txt: {
        alignSelf: 'center',
        textAlign: 'center',
        top: -162.5 * windowWidth / 844,
        fontSize: 30 * windowWidth / 844,
        fontFamily: 'Baloo-Regular',
        color: color.honey

    },
    market: {
        bottom: 10 * windowWidth / 844,
        right: 10 * windowWidth / 844,
        position: 'absolute',
        width: 75 * windowWidth / 844,
        height: 75 * windowWidth / 844
    },
    market_txt: {
        position: 'absolute',
        right: 82 * windowWidth / 844,
        bottom: 10 * windowWidth / 844,
        fontSize: 25 * windowWidth / 844,
        fontFamily: 'Baloo-Regular',
        color: color.honey
    },
    account: {
        fontFamily: 'Baloo-Regular',
        position: 'absolute',
        fontSize: 26 * windowWidth / 844,
        bottom: 0,
        alignSelf: 'center',
        color: color.cream
    },
    asset_list: {
        position: 'absolute',
        left: 442 * windowWidth / 844,
        top: 100 * windowWidth / 844,
        width: 300 * windowWidth / 844,
        height: 235 * windowWidth / 844,
        borderColor: color.honey,
        borderWidth: 1
    },
})