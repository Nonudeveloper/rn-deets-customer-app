import React, { Component } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

const withConnectivity = WrappedComponent => class extends Component {

     constructor(props) {
        super(props);
        this.state = { isConnected: true };
     }
     componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
     }
    
      componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
      }
    
      handleConnectivityChange = isConnected => {
          console.log(isConnected);
        if (isConnected) {
          this.setState({ isConnected });
        } else {
          this.setState({ isConnected });
        }
      };

      render() {
        return (
        <View style={{ flex: 1 }}>
            {!this.state.isConnected && <MiniOfflineSign />}
            <WrappedComponent {...this.props} />
        </View>
        );
      }
}; 


const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#b52424',
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
    },
    offlineText: { 
        color: '#fff'
    }
});

export default withConnectivity;
