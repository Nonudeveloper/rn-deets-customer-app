import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    annotationContainer: {
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 15,
    },
    annotationFill: {
      width: 30,
      height: 30,
      borderRadius: 50,
      backgroundColor: 'orange',
      transform: [{ scale: 0.6 }],
    },
    map: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
    },
    calloutWraper: {
      position: 'absolute',
      top: (height / 2) - 86,
      left: (width / 2) - 50,
      // backgroundColor: '#66cc00',
      width: 95,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      borderWidth: 2,
      // borderColor: '#bfff80',
    },
    customMarker: {
      position: 'absolute',
      top: (height / 2) - 50,
      left: (width / 2) - 17,
    },
    myAppointments: {
      position: 'absolute',
      bottom: 0,
      height: 60,
      width: '100%',
      backgroundColor: '#333',
      justifyContent: 'center',
      alignItems: 'center'
    },
    myAppointmentsText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18
    },
    gpsIconContainer: {
      position: 'absolute',
      bottom: 80,
      right: 20,
    },
    gpsIcon: {
      resizeMode: 'contain',
      height: 40,
      width: 40
    }

  });

  export default styles;
