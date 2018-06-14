/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class animationTutorial extends Component {
  constructor(){
    super()
    this.state = {
      animate: new Animated.Value(30),
      animateXY: new Animated.ValueXY({x: 0, y: 0}),
      radius: new Animated.Value(0)
    }
    this.animateInterpolate = this.state.animateXY.x.interpolate({
      inputRange: [0, 150],
      outputRange: ['rgba(255,255,255, 1)', 'rgba(51,156,177,1)']
    })
  }
  
  componentWillMount () {
    Animated.sequence([
      Animated.timing(this.state.animateXY, {
        toValue: {x: height / 2, y: 0},
        duration: 6000
      }),
      Animated.timing(this.state.animate, {
        toValue: 60,
        duration: 6000
      }),
      Animated.timing(this.state.radius, {
        toValue: 40,
        duration: 2000
      })
    ]).start()
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Animated.View 
          style={
            {
              width: this.state.animate, 
              height: this.state.animate, 
              backgroundColor: this.animateInterpolate,
              position: 'absolute',
              top: this.state.animateXY.x,
              left: this.state.animateXY.y,
              borderRadius: this.state.radius,
            }
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('animationTutorial', () => animationTutorial);