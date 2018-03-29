import { StyleSheet } from 'react-native';
import StyleConstants from '../../../config/StyleConstants';

// const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  nextButtonContainer: {
    justifyContent: 'center',
  },
  nextButtonStyle: {
    marginTop: 15,
    borderRadius: 100,
    height: 60,
    backgroundColor: StyleConstants.LoginButtonBColor,
    borderWidth: 4,
    borderColor: '#d7ecc5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgetForm: {
    marginTop: 100, 
  }
});

