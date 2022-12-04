import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'


export default class Binance extends Component {
    constructor() {
        super();
        this.state = {
            binance: []
        }
    }
    componentDidMount() {
        this.apiCall();
    }
    async apiCall() {
        let resp = await fetch('https://eapi.binance.com/eapi/v1/exchangeInfo')
        let respJson = await resp.json()
        this.setState({ binance: respJson.optionSymbols })
        console.log(this.state.binance)
    }
    render() {
        return (
            <View>
                <Text>Sa</Text>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={this.state.binance}
                    renderItem={({ item }) => (<Text>{item.symbol}</Text>)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({})