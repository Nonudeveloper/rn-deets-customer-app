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
    },
    notAvailableContainer: {
        flex: 1, 
        alignItems: 'center', 
        marginVertical: 20
    },
    notAvailableText: {
        fontSize: 20, 
        color: '#1a1a1a',
        paddingTop: 20, 
        textAlign: 'center'
    },
    notAvailableImage: {
        width: 72, 
        height: 75
    }
});

export default styles;
