import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    timeIntervalWrapper: {
      height: 30, 
      position: 'absolute',
      bottom: 0, 
      flexDirection: 'row',
      backgroundColor: '#A0CD61',
      width: '100%'
    },
    timeIntervalStaticTextContainer: {
      flex: 1.5, 
      justifyContent: 'center', 
      alignItems: 'flex-end'
    },
    item: {
      fontSize: 16,
      marginBottom: 2,
      color: '#1a1a1a'
    },
    itemContainer: {
      flex: 1,
      borderBottomColor: '#000'
    },
    avatarContainer: {
      flex: 1.5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    avatar: {
      height: 70,
      width: 70,
      borderWidth: 1,
      borderRadius: 70/2,
      borderColor: '#fff',
      zIndex: 2
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 70/2
    },
    locationIcon: {
      resizeMode: 'contain',
      height: 25,
      width: 25
    },
    options: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderLeftWidth: 1,
      borderLeftColor: 'grey',
      marginVertical: 10
    },
    appointmentDetails: {
      flex: 3,
      justifyContent: 'center'
    },
    itemDetailContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: 'grey'
    },
    locationContainer: {
      flex: 1.3,
      // height: 40,
      flexDirection: 'row',
    },
    locationIconCont: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    locationTextCont: {
      flex: 4,
      justifyContent: 'center',
      left: 10
      
    },
    text: {
      fontSize: 16,
    },
    messageIcon: {
      marginVertical: 15,
      width: 20,
      height: 20
    },
    dateTime: {
      fontSize: 16,
      color: '#1a1a1a',
      top: 3
    },
    ratingStart: {
      resizeMode: 'contain',
      height: 16,
      width: 16,
      marginRight: 6,
      bottom: 2,
      top: 2
    },
    ratingContainer: {
      flexDirection: 'row'
    },
    hrContainer: {
      borderLeftColor: 'grey', 
      borderLeftWidth: 1, 
      marginVertical: 5,
    },
    swipOutContainer: {
      height: 160, 
      borderBottomColor: '#000000', 
      borderBottomWidth: 2
    },
    vehicleInfoWrapper: {
      height: 90
    },
    vehicleInfoContainer: {
      flex:1,  
      paddingLeft:10
    },
    vehicleInfoInnerContainer: {
      flex:1, 
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'grey'
    },
    paymentContainer: {
      height: 30, 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      flexDirection: 'row',
      marginHorizontal: 20,
      marginTop: 10
    },
    paymentImageStyle: {
      resizeMode: 'contain', 
      height: 35, 
      width: 60
    },
    serviceCostWrapper: {
      flex: 1,
      flexDirection: 'row'
    },
    serviceNameContainer: {
      flex: 4,
      justifyContent: 'center',
      paddingLeft:10
    },
    serviceNameTextStyle: {
      fontSize: 16, 
      color: '#000'
    },
    serviceCostContainer: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    serviceCostStyle: {
      fontSize: 16, 
      color: '#000'
    },
    addOnsWrapper: {
      // flex: 1, 
      height:18,
      flexDirection: 'row'
    },
    addOnsTextWrapper: {
        flex: 5.3, 
        flexDirection: 'row', 
        // borderRightColor: '#5A5A5A', 
        // borderRightWidth: 2.5
    },
    addOnsFirstTextContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'flex-end'
    },
    addOnsNameTextContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'flex-start'
    },
    addOnsCostContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    passwordImage: {
      width: 8, 
      height: 8, 
      marginRight: 1
    },
    paymentTextStyle: {
      left: 5,
      fontSize: 16, 
      color: 'grey'
    },
    averageRatingTextStyle: {
      paddingLeft: 7, 
      fontSize: 16, 
      color: '#586069'
    }
  });

  export default styles;
