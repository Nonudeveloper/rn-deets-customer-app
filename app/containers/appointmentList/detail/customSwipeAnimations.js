import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  PanResponder,
  Animated,
} from 'react-native';
import { Constants } from 'expo';

// You can import from local files
import AssetExample from './components/AssetExample';

import clamp from 'clamp';

// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // Version can be specified in package.json

const SWIPE_THRESHOLD = 50;

export default class App extends Component {
  
  state = {
    animation: new Animated.ValueXY(),
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.animation.x,
          dy: this.state.animation.y,
        },
      ]),
      onPanResponderRelease: (e, { dx, vx, vy }) => {
        let velocity;
        console.log(dx);
        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(Math.abs(vx), 3, 5) * -1;
        }

        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          Animated.decay(this.state.animation, {
            velocity: { x: velocity, y: vy },
            deceleration: 0.98,
          }).start();
        } else {
          Animated.spring(this.state.animation, {
            toValue: { x: 0, y: 0 },
            friction: 4,
          }).start();
        }
      },
    });
  }

  render() {
    const { animation } = this.state;

    const swipe = animation.x.interpolate({
      inputRange: [-100, 0, 100],
      outputRange: [100, 0, -100],
      extrapolate: 'clamp',
    });

    const containerStyle = {
      right: swipe,
    };

    return (
      <View style={styles.container}>
        <Animated.View
          {...this._panResponder.panHandlers}
          style={[{ flexDirection: 'row', backgroundColor: 'white' }, containerStyle]}>
          <View style={{ marginHorizontal: 10 }}>
            <Image
              source={{
                uri: 'https://sbkl.s3-ap-southeast-1.amazonaws.com/public/products/CheesePlatter.jpeg',
              }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
              resizeMode={'cover'}
            />
          </View>

          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              {' '}
            </Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
