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
        height: 500,
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
        height: 40,
        borderBottomColor: '#a8a8a8', 
        borderBottomWidth: 1 
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
        color: '#1a1a1a',
        fontSize: 20 
      },
      modalBodyContainer: {
        flex: 1,
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
        height: 20,
      },
      boldText: {
        // fontWeight: 'bold', 
        color: '#1a1a1a',
        fontSize: 20 
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
      switch: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
      },
      container2: {
        backgroundColor: '#333333',
        marginTop: 60,
      },
      label: {
        color: 'black',
        fontSize: 12,
      },
      input: {
        fontSize: 16,
        color: 'grey',
      },
      modelCancelText: {
        color: '#4da6ff', 
        fontSize: 20,
        // paddingLeft: 20
      },
      flatlistContainer: {
        flex: 1, 
        justifyContent: 'space-around'
      },
      recentText: {
        fontSize: 20, 
        paddingLeft: 20
      },
      otherText: {
        fontSize: 20, 
        paddingLeft: 20
      },
      flatlistBodyOuterContainer: {
        justifyContent: 'space-around',
        marginLeft: 20
      },
      TouchableHighlightOuterContainer: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      TouchableHighlightInnerContainer: {
        height: 110,
        width: 110,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white', 
        borderRadius: 10
      },
      paymentTypeContainer: {
        justifyContent: 'center',
         alignItems: 'center', 
         height: 30
      },
      paymentTypeText: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      cardDetailBodyContainer: {
        height: 50, 
        backgroundColor: '#fff', 
        borderBottomColor: 'grey', 
        borderTopColor: 'grey', 
        borderTopWidth: 1, 
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      passwordImageContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
      },
      passwordImage: {
        width: 8, 
        height: 8, 
        marginRight: 1
      }

});
