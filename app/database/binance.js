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
        console.log(this.state.binance[0])
    }
    render() {
        return (
            <View>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={this.state.binance}
                    renderItem={({ item }) => (<Text>{
                        'symbol : ' + item.symbol.split('-')[0] +
                        ' due : ' + item.symbol.split('-')[1] +
                        ' strike : ' + item.symbol.split('-')[2] +
                        ' type : ' + item.symbol.split('-')[3] +
                        ' max: ' + item.filters[0].maxPrice +
                        ' min: ' + item.filters[0].minPrice}</Text>)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({})