import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
      },
      modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: '#00000040',
      },
      modalContentContainer: {
        backgroundColor: '#e6e6e6',
        height: 200,
        width: Dimensions.get('window').width - 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'flex-start',
      },
      modalHeaderContainer: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        top: 8,
        height: 20,
      },
      cancelContainer: { 
        flex: 1, 
        left: 10 
      },
      titleContainer: { 
        flex: 1, 
        position: 'absolute'
      },
      title: { 
        fontWeight: 'bold', 
        color: '#1a1a1a' 
      },
      modalBodyContainer: {
        position: 'relative',
        top: 30,
        justifyContent: 'flex-start'
      },
      cardImage: {
        resizeMode: 'contain', 
        width: 80, 
        height: 20 
      },
      paypalImg: {
        resizeMode: 'contain', 
        width: 80, 
        height: 20 
      },
      boldText: {
        fontWeight: 'bold', 
        color: '#1a1a1a' 
      },
      paymentItem: { 
        flexDirection: 'row', 
        height: 40, 
        alignItems: 'center', 
        borderBottomColor: '#a8a8a8', 
        borderBottomWidth: 1 
      },
      cardBigImage: {
        resizeMode: 'contain', 
        width: 100, 
        height: 100 
      },


});
