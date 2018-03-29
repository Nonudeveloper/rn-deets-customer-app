import { StyleSheet } from 'react-native';
import StyleConstants from '../../config/StyleConstants';
// const window = Dimensions.get('window');

export default StyleSheet.create({
  fbButtonContainer: {
      justifyContent: 'center',
  },
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
  fbButtonContentContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center'
  },
  fbIcon: {
      paddingLeft: 15,
      justifyContent: 'center',
  },
  fbTitle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 35
  }
});