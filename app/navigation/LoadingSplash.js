import React, { Component } from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';

export default class LoadingSplash extends Component {
    render() {
        return <Image style={{ height: '100%', width: '100%', flex: 1 }} source={this.props.source} />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold'
    }
});
