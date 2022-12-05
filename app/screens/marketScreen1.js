import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import color from '../color'

const marketScreen1 = () => {
    return (
        <View style={styles.modalView}>
            <Modal
                visible={true}
                animationType={'fade'}
                transparent={true}
                supportedOrientations={['landscape']}
                style={styles.modalStyle}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <Image source={{
                            uri: 'https://imageio.forbes.com/specials-images/imageserve/5babb7f1a7ea4342a948b79a/0x0.jpg?format=jpg&crop=2327,2329,x748,y1753,safe&height=416&width=416&fit=bounds',
                            width: 150,
                            height: 200,
                        }} />
                    </TouchableWithoutFeedback>
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
});
export default marketScreen1