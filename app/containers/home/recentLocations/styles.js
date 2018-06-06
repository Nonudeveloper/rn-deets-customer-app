import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainContainer: {
        flex: 1,
        top: 20
    },
    bodyContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: 60
    },
    mapImageContainer: {
        flex: 0.5, 
        alignItems: 'center'
    },
    imageStyle: {
        height: 30, 
        width: 20
    },
    textContainer: {
        flex: 3
    },
    textStyle: {
        fontSize: 17, 
        color: '#404040',
        lineHeight: 20
    }
});

export default styles;
