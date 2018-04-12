import { StyleSheet } from 'react-native';

// const window = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowOffset: { height: -5, width: -5 },
        shadowRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    vehicleContainer: {
      height: 100, 
      backgroundColor: 'white',
      borderBottomWidth: 2, 
      borderBottomColor: '#e0e0e0', 
      borderTopWidth: 2, 
      borderTopColor: '#e0e0e0',
      flexDirection: 'row',
      alignItems: 'center',
      // top: 10
    },
    radioButtonContainer: {
      paddingLeft: 30, 
      paddingRight: 30
    },
    vehicleInnerContainer: {
      flex: 1, 
      width: 300, 
      flexDirection: 'row',
    },
    selectedArrayItemsBtn:
      {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignSelf: 'stretch'
      },
      nextButtonContainer: {
        paddingBottom: 20,
    },
    nextButtonStyle: {
        borderRadius: 100,
        height: 55,
        // backgroundColor: '#8ac10b',
        borderWidth: 4,
        borderColor: '#bfff80',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

