import { Text, StyleSheet, View ,Dimensions} from 'react-native'
import React, { Component } from 'react'
import CircleSli from './app/widgets/CircleSlider'
import HomePage from './app/screens/HomePage'
import color from './app/color'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HomePage />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.lightBlue,
    flex: 1
  }
})