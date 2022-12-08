import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, FlatList } from 'react-native'
import React, { Component, useContext, useState } from 'react'
import color from '../color'
import Donut from '../widgets/Donut'
import account_db from '../database/account'
import CircleSli from '../widgets/CircleSlider'
import MarketScreen1 from './marketScreen1'
import BinanceProvider from '../database/binance'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { Binance } from '../database/binance'

data = [{ value: 24 }, { value: 24 }, { value: 24 }, { value: 23 }]


const HomePage = () => {
    const [market, setMarket] = useState(false)
    const { tickers } = useContext(Binance)
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
            <View style={styles.holder_cup}>
                <Image source={require('../assets/holder_cup.png')} />
                <Image source={require('../assets/bronze_big.png')} style={styles.holded_item} />
                <Text style={[styles.holded_txt, { color: 'black' }]}> 1234.</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => { console.log('league') }}>
                <Image source={require('../assets/league.png')} style={styles.league} />
            </TouchableWithoutFeedback>
            <Text style={styles.league_txt}>LEAGUE</Text>
            <TouchableWithoutFeedback onPress={() => { [setMarket(!market)] }}>
                <Image source={require('../assets/market.png')} style={styles.market} />
            </TouchableWithoutFeedback>
            <BinanceProvider>
                <MarketScreen1 market={market} updateMarket={() => { setMarket(!market) }}></MarketScreen1>
            </BinanceProvider>
            <Text style={styles.market_txt}>MARKET</Text>
            <View style={styles.donut}>
                <Donut data={data}></Donut>
                <Text style={styles.donut_txt}>$ XXX.XX</Text>
                <Text style={[styles.donut_return, [12.32 > 0 ? { color: color.green } : { color: color.red }]]}> {12.32 + '%'}</Text>
            </View>
            <Text style={styles.account}>TERRAROSSA</Text>
            <View style={styles.asset_list}>
            </View>
        </View >
    )

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
        bottom: 5 * windowWidth / 844,
        color: color.honey
    },
    holder_cup: {
        top: 25,
        position: 'absolute',
        alignSelf: 'baseline',
        width: 200 * windowWidth / 844,
        height: 29 * windowWidth / 844,
    },
    holded_item: {
        position: 'absolute',
        top: '-50%',
        left: '5%'
    },
    holded_txt: {
        alignSelf: 'center',
        position: 'absolute',
        textAlign: 'center',
        fontSize: 21,
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
        color: color.mauve
    },
    donut: {
        position: 'absolute',
        left: 180 * windowWidth / 844,
        top: 100 * windowWidth / 844,
        width: windowWidth * 235 / 844,
        height: windowWidth * 235 / 844,
        alignItems: 'center'
    },
    donut_txt: {
        position: 'absolute',
        bottom: -95 * windowWidth / 844,
        textAlign: 'center',
        width: 235 * windowWidth / 844,
        height: 235 * windowWidth / 844,
        fontSize: 25,
        color: color.honey
    },
    donut_return: {
        alignSelf: 'center',
        position: 'absolute',
        textAlign: 'center',
        fontSize: 21,
        top: '52.5%'
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
        color: color.honey
    },
    account: {
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

export default HomePage