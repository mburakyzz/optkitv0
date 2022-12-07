import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Image, FlatList, TouchableOpacity, Button } from 'react-native'
import React, { useContext, useState ,useEffect} from 'react'
import color from '../color'
import { Binance } from '../database/binance'
import strategies from '../database/strategies'


const MarketScreen1 = ({market,updateMarket}) => {
    const {tickers,getDues,dues} = useContext(Binance)
    const [selectedItems,setSelectedItems] = useState({ticker:'',due:'',str:''})

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
                                <TouchableOpacity style={styles.tickerButton} onPress={()=>{[getDues(item.symbol),setSelectedItems({...selectedItems,ticker:item.symbol})]}}>
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
                            keyExtractor={(i)=>i.id}
                            horizontal
                            renderItem={({item})=>(
                                <TouchableOpacity style={styles.dueButton} onPress={()=>{[console.log(item),setSelectedItems({...selectedItems,due:item})]}}>
                                    <Text style={styles.dueTxt}>
                                        {item}  
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={styles.strategyContainer}>
                        <FlatList
                            data={Object.keys(strategies)}
                            keyExtractor={(i)=>Object.keys(strategies[i]).id}
                            horizontal
                            renderItem={({item})=>(
                                <TouchableOpacity style={styles.strategyButton} onPress={()=>{[setSelectedItems({...selectedItems,str:item})]}}>
                                    <Image source={(strategies[item].img)} style={styles.strategyButton}/>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <TouchableOpacity style={{position:'absolute',right:0,bottom:0}} onPress={()=>{console.log(selectedItems)}}><Text>State Nedir?</Text></TouchableOpacity>
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
        top:'5%',
        left:'5%',
    },
    tickerButton:{
        backgroundColor:color.lightBlue,
        width:80,
        height:80,
        alignSelf:'center',
        margin:10,
        borderRadius:15,
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
        top:'37.5%',
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
    },
    strategyContainer:{
        width:600,
        height:124,
        borderWidth:5,
        borderColor:color.darkBlue,
        position:'absolute',
        top:'62%',
        left:'5%',
    },
    strategyButton:{
        width:100,
        height:100,
        alignSelf:'center',
        margin:5

    },
    strategyTxt:{
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