import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Image, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import color from '../color'
import { FlatList } from 'react-native'
import { Binance } from '../database/binance'


const MarketScreen1 = ({market,updateMarket}) => {
    const {binanceData,tickers} = useContext(Binance)
    console.log(tickers)
    return (
        <View style={styles.modalView}>
            <Modal
                visible={market}
                animationType={'slide'}
                transparent={true}
                supportedOrientations={['landscape']}
                style={styles.modalStyle}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback onPress={updateMarket}>
                        <Image source={require('../assets/close.png')} style={styles.closeBtn}/>
                    </TouchableWithoutFeedback>
                    <View style={styles.tickerContainer}>
                        <FlatList
                            
                        />
                    </View>
                </View>
            </Modal>
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
        backgroundColor: color.cream,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: '5%',
        left: '5%'
    },
    modalStyle: {
    },
    closeBtn:{
        position:'absolute',
        width:35,
        height:35,
        top:0,
        right:0
    },
    tickerContainer:{
        width:600,
        height:100,
        borderWidth:5,
        borderColor:color.darkBlue,
        position:'absolute',
        top:'10%',
        left:'5%'
    }
});
export default MarketScreen1