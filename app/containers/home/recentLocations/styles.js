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
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
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
        fontSize: 20, 
        color: 'black'
    }
});

export default styles;
