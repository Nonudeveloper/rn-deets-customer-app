import { StyleSheet } from 'react-native';
import StyleConstants from '../../config/StyleConstants';

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
  textWithDivider: {
    color: "black",
    marginVertical: 10,
    paddingHorizontal: 10
  },
  forgotPasswordText: {
    color: '#000',
    fontSize: 13,
  },
  forgotPasswordView: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center'
  },
  buttonStyle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonArea: {
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  innerContainer: {
    flex: 1,
    top: 30
  }
});

