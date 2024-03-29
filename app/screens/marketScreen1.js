import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Image, FlatList, TouchableOpacity, Dimensions, Pressable } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import color from '../color'
import { Binance } from '../database/binance'
import strategies from '../database/strategies'
import MarketScreen2 from './marketScreen2'
import BinanceProvider from '../database/binance'


const MarketScreen1 = ({ market, updateMarket }) => {
    const [market2, setMarket2] = useState(false)
    const { tickers,
         getDues, dues,
         setSelectedDue,selectedDue,
         setSelectedTicker,selectedTicker,
         setSelectedStrategy,
         selectedStrikes,
         selectedCosts} = useContext(Binance)
    return (
        <View style={styles.modalView}>
            <Modal
                visible={market}
                animationType={'fade'}
                transparent={true}
                supportedOrientations={['landscape']}
                style={styles.modalStyle}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback onPress={updateMarket}>
                        <Image source={require('../assets/close.png')} style={styles.closeBtn} />
                    </TouchableWithoutFeedback>
                    <View style={styles.tickerContainer}>
                        <FlatList
                            data={tickers}
                            keyExtractor={(i) => i.id}
                            horizontal
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.tickerButton} onPress={() => { [getDues(item.symbol),setSelectedTicker(item.symbol)]}}>
                                    <Text style={styles.tickerTxt}>
                                        {item.symbol}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={styles.dueContainer}>
                        <FlatList
                            data={dues}
                            key={(i) => {dues.indexOf(i)+1}}
                            horizontal
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.dueButton} onPress={() => {setSelectedDue(item)}}>
                                    <Text style={styles.dueTxt}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={styles.strategyContainer}>
                        <FlatList
                            data={strategies}
                            keyExtractor={(i) => i.id}
                            horizontal
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.strategyButton} onPress={() => {setSelectedStrategy(item.options)}}>
                                    <Image source={(item.img)} style={styles.strategyButton} />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <TouchableOpacity style={{ position: 'absolute', right: 0, bottom: 0 }} onPress={() => {console.log('tic: '+selectedTicker,'due: '+selectedDue,'strikes: '+selectedStrikes ,'cost: '+selectedCosts)}}><Text>State Nedir?</Text></TouchableOpacity>
                    <View style={styles.right}>
                        <Text style={styles.progress}>1/3</Text>
                        <TouchableOpacity onPress={()=>{if(selectedTicker && selectedDue && selectedCosts && selectedStrikes){[setMarket2(!market2),updateMarket()]}}} >
                            <Image source={require('../assets/next.png')} style={styles.next}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ position: 'absolute', left: 0, bottom: '15%', width:50,height:50}}  onPress={()=>{setSelectedStrategy(null)}} >
                        <Image source={require('../assets/close.png')} style={{ width:50,height:50}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ position: 'absolute', left: 0, bottom: '50%', width:50,height:50}}  onPress={()=>{setSelectedDue(null)}} >
                        <Image source={require('../assets/close.png')} style={{ width:50,height:50}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ position: 'absolute', left: 0, bottom: '70%', width:50,height:50}}  onPress={()=>{setSelectedTicker(null)}} >
                        <Image source={require('../assets/close.png')} style={{ width:50,height:50}}/>
                    </TouchableOpacity>
                </View>
            </Modal>
            <MarketScreen2 market2={market2} updateMarket2={() => { setMarket2(!market2) }} ></MarketScreen2>
        </View>
    )
}


const styles = StyleSheet.create({
    modalView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        width: '90%',
        height: '90%',
        backgroundColor: color.honey,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: '5%',
        left: '5%'
    },
    modalStyle: {
    },
    closeBtn: {
        position: 'absolute',
        width: 35,
        height: 35,
        top: 0,
        right: 0
    },
    tickerContainer: {
        width: 600 * windowWidth / 844,
        height: 100,
        borderWidth: 5,
        borderColor: color.lightBlue,
        position: 'absolute',
        top: '5%',
        left: '5%',
    },
    tickerButton: {
        backgroundColor: color.darkBlue,
        width: 80,
        height: 80,
        alignSelf: 'center',
        margin: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    tickerTxt: {
        width: '100%',
        height: 80,
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: '700',
        color: color.cream
    },
    dueContainer: {
        width: 600 * windowWidth / 844,
        height: 75,
        borderWidth: 5,
        borderColor: color.lightBlue,
        position: 'absolute',
        top: '37.5%',
        left: '5%',
    },
    dueButton: {
        backgroundColor: color.darkBlue,
        width: 100,
        height: 50,
        alignSelf: 'center',
        margin: 10,
        borderRadius: 10
    },
    dueTxt: {
        width: 100,
        height: 50,
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: '700',
        color: color.cream
    },
    strategyContainer: {
        width: 600 * windowWidth / 844,
        height: 124,
        borderWidth: 5,
        borderColor: color.lightBlue,
        position: 'absolute',
        top: '62%',
        left: '5%',
    },
    strategyButton: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        margin: 5

    },
    strategyTxt: {
        width: 100,
        height: 50,
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: '700',
        color: color.cream
    },
    right:{
        position:'absolute',
        right:0,
        bottom:'25%',
        height:200,
        width:100,
        alignItems:'center'
    },
    progress:{
        textAlign:'center',
        fontSize:24,
        fontWeight:'900',
        color:color.darkBlue,
        flex:1
    },
    next:{
        top:'-50%',
        opacity:1
    },
    nextInvalid:{
        opacity:.5
    }
});
export default MarketScreen1