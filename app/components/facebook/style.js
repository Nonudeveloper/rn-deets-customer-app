import { StyleSheet } from 'react-native';
import StyleConstants from '../../config/StyleConstants';
// const window = Dimensions.get('window');

export default StyleSheet.create({
 
  fbButtonStyle: {
      marginTop: 40,
      marginHorizontal: 25,
      borderRadius: 100,
      backgroundColor: StyleConstants.FaceBookBColor,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      height: 50,
  },
  buttonStyle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
