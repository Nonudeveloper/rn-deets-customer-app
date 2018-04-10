import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'grey',
      flexDirection: 'column',
      // justifyContent: 'flex-start',
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
      top: (height / 2) - 80, 
      left: (width / 2) - 45,
      backgroundColor: '#66cc00',
      width: 85,
      height: 28,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      borderWidth: 4,
      borderColor: '#bfff80',
    },
    customMarker: { 
      position: 'absolute', 
      top: (height / 2) - 50, 
      left: (width / 2) - 17,
  
    }
  });

  export default styles;
