import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useState ,useEffect} from 'react'
import color from '../color'
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
                            data={tickers}
                            keyExtractor={(i)=>i.id}
                            horizontal
                            renderItem={({item})=>(
                                <TouchableOpacity style={styles.tickerButton}>
                                    <Text style={styles.tickerTxt}>
                                        {item.symbol}  
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={styles.dueContainer}>
                        <FlatList
                            data={tickers}
                            keyExtractor={(i)=>i.id}
                            horizontal
                            renderItem={({item})=>(
                                <TouchableOpacity style={styles.dueButton}>
                                    <Text style={styles.dueTxt}>
                                        {item.symbol}  
                                    </Text>
                                </TouchableOpacity>
                            )}
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
        left:'5%',
    },
    tickerButton:{
        backgroundColor:color.lightBlue,
        width:80,
        height:80,
        alignSelf:'center',
        margin:10,
        borderRadius:15
    },
    tickerTxt:{
        width:80,
        height:80,
        fontSize:20,
        textAlign:'center',
        textAlignVertical:'center',
        fontWeight:'700',
        color:color.honey
    },
    dueContainer:{
        width:600,
        height:75,
        borderWidth:5,
        borderColor:color.darkBlue,
        position:'absolute',
        top:'42.5%',
        left:'5%',
    },
    dueButton:{
        backgroundColor:color.lightBlue,
        width:100,
        height:50,
        alignSelf:'center',
        margin:10,
        borderRadius:10
    },
    dueTxt:{
        width:100,
        height:50,
        fontSize:18,
        textAlign:'center',
        textAlignVertical:'center',
        fontWeight:'700',
        color:color.honey
    }
});
export default MarketScreen1