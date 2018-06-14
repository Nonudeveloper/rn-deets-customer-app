import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Easing,
  Animated,
  Button,
  ScrollView
} from 'react-native';

export default class App extends Component {
  
  constructor () {
  	super()
    this.animatedValue = new Animated.Value(0)
  }
  
  animate (easing) {
    this.animatedValue.setValue(0)
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 1000,
          easing
        }
    ).start()
  }
  
  render () {
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 260]
    })
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.block, {marginLeft} ]} />
        <ScrollView>
      		<Text style={{textAlign: 'center'}}>Scroll up for more animations</Text>
      		<Button style={styles.button} title={"ffffff"} onPress={this.animate.bind(this, Easing.bounce)}>
                <Text>Bounce</Text>
          </Button>
    	
      	</ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  button: {
  	height: 60,
    backgroundColor: '#ededed',
    borderRadius: 4,
    marginTop: 10,
    paddingTop: 20,
    fontSize: 18
  },
  block: {
  	width: 50,
    height: 50,
    backgroundColor: 'red'
  }
});