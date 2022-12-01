import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import CircleSli from './app/widgets/CircleSlider'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CircleSli />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '-10%'
  }
})