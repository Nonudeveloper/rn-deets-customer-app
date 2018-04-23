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
      // top: 10,
      paddingHorizontal: 20
    },
    radioButtonContainer: {
        paddingHorizontal: 17
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
    vehicleFont: { 
      fontSize: 16, 
      color: '#586069' 
    },
    licenceFont: { 
      fontSize: 18, 
      color: 'black', 
      fontWeight: 'bold' 
    },
    radioButton:
    {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
 
    radioButtonHolder:
    {
        borderRadius: 50,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
 
    radioIcon:
    {
        // borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
 
    label:
    {
        marginLeft: 10,
        fontSize: 20
    },
 
    selectedTextHolder:
    {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center'
    },
 
    selectedText:
    {
        fontSize: 18,
        color: 'white'
    },
});

