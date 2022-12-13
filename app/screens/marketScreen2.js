import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Image, FlatList, TouchableOpacity, Dimensions, Pressable, Slider } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import color from '../color'
import { Binance } from '../database/binance'
import StrikeSlider from '../widgets/StrikeSlider';
import OptionChart from '../widgets/OptionChart';


const MarketScreen2 = ({ market2, updateMarket2 }) => {
    const { selectedCosts,selectedStrikes,selectedTypes,selectedPositions,selectedTicker,selectedDue } = useContext(Binance)
    return (
        <View style={styles.modalView}>
            <Modal
                visible={market2}
                animationType={'fade'}
                transparent={true}
                supportedOrientations={['landscape']}
                style={styles.modalStyle}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback onPress={updateMarket2}>
                        <Image source={require('../assets/close.png')} style={styles.closeBtn} />
                    </TouchableWithoutFeedback>
                    <View style={styles.right}>
                        <Text style={styles.progress}>2/3</Text>
                        <TouchableOpacity onPress={()=>{console.log('sa')}} >
                            <Image source={require('../assets/next.png')} style={[styles.next,]}/>
                        </TouchableOpacity>
                    </View>
                    <StrikeSlider style={styles.slider} strikes={selectedStrikes}/>
                    <OptionChart style={styles.optionChart}/>
                    <TouchableOpacity style={{ position: 'absolute', right: 0, bottom: 0 }} onPress={() => { console.log('Ticker: '+selectedTicker,'Due: '+selectedDue,'Types: '+selectedTypes,'Positions: '+selectedPositions,'Costs: '+selectedCosts,'Strikes: '+selectedStrikes) }}><Text>State Nedir?</Text></TouchableOpacity>
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
    },
    slider:{
        position:'absolute',
        width:600,
        height:100,
        bottom:0,
        left:0
    },
    optionChart:{
        position:'absolute',
        width:600,
        height:300,
        bottom:0,
        left:0
    }
});
export default MarketScreen2