import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    paymentContainer: {
        width: '100%', 
        height: 50, 
        bottom: 0, 
        position: 'absolute',
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        borderTopColor: '#696969', 
        borderTopWidth: 2
        
    },
    paymentImageContainer: {
      flexDirection: 'row', 
      alignItems: 'center'
    },
    paymentCostTextStyle: {
      fontSize: 24, 
      color: '#000'
    },
    paymentImageStyle: {
        resizeMode: 'contain', 
        height: 35, 
        width: 60
      },
      passwordImage: {
        width: 8, 
        height: 8, 
        marginRight: 1
      },
      paymentTextStyle: {
        left: 5,
        fontSize: 20, 
        color: 'grey'
      },
      options: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'grey',
        marginVertical: 20
      },
      messageIcon: {
        marginVertical: 15,
        width: 20,
        height: 20
      },
      image: {
        width: '80%',
        height: '70%',
        borderRadius: 100,
      },
      radioImage: {
        resizeMode: 'contain',
        width: 20,
        height: 20
    },
    radioContainer: {
        height: 70, 
        flexDirection: 'row', 
        alignItems: 'center',
        paddingLeft: 20
    },
    radioContainerText: {
        fontSize: 18, 
        color: '#000',
        paddingLeft: 10
    },
    radioContainerTimeText: {
      fontSize: 18, 
      color: '#686868',
      paddingLeft: 10
    },
    addOnsWrapper: {
      flex:1, 
      paddingLeft: 20, 
      borderBottomColor: 'black', 
      borderBottomWidth: 2
    },
    addOnsContainer: {
      flex: 1, 
      height: 70, 
      flexDirection: 'row'
    },
    addOnsNameContainer: {
      flex: 1, 
      justifyContent: 'flex-end'
    },
    addOnsEstimateTimeContainer: {
      flex: 1, 
      flexDirection: 'row',
      paddingLeft: 10
    },
    addOnsStaticTextContainer: {
      flex:1, 
      marginVertical: 5, 
      backgroundColor: 'grey', 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    addOnsStaticTextStyle: {
      fontSize: 16, 
      color: '#000'
    },
    addOnsEstimateTimeInnerContainer: {
      flex:2.5, 
      justifyContent: 'center'
    },
    addOnsCostContainer: {
      flex: 1, 
      justifyContent: 'center'
    },
    providerInfoWrapper: {
      flex: 1, 
      paddingTop: 30
    },
    staticServiceTextContainer: {
      height: 50, 
      width: '100%', 
      borderBottomColor: '#696969', 
      borderBottomWidth: 2, 
      borderTopColor: '#696969', 
      borderTopWidth: 3, 
      justifyContent: 'center'
    },
    staticServiceTextStyle: {
      fontSize: 18, 
      color: '#7CBB22', 
      paddingLeft: 20
    },
    providerInfoContainer: {
      flex: 1, 
      borderTopColor: '#696969', 
      borderTopWidth: 2
    },
    providerDetailWrapper: {
      flex: 3, 
      borderBottomColor: '#696969', 
      borderBottomWidth: 2
    },
    providerDetailContainer: {
      flex: 1, 
      flexDirection: 'row', 
      paddingLeft: 20 
    },
    providerImageContainer: {
      flex: 1.5, 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    providerNameContainer: {
      flex: 2.5, 
      justifyContent: 'center', 
      alignItems: 'flex-start'
    },
    serviceDetailContainer: {
      flex: 1, 
      flexDirection: 'row', 
      backgroundColor: '#7CBB22'
    },
    serviceNameContainer: {
      flex: 4, 
      justifyContent: 'center'
    },
    serivceNameTextStyle: {
      fontSize: 23, 
      color: '#fff', 
      paddingLeft: 20
    },
    serviceCostContainer: {
      flex: 1, 
      justifyContent: 'center'
    },
    serviceCostTextStyle: {
      fontSize: 26, 
      color: '#fff'
    }
  });

  export default styles;
