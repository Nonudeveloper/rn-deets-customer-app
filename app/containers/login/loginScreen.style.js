import { StyleSheet } from 'react-native';

// const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  input: {
    height: 55,
    borderBottomWidth:2,
    borderColor: 'gray',
    color: 'white',
    marginLeft: 25,
    fontSize:16
  },
  nextButtonContainer: {
    justifyContent: 'center',
  },
  nextButtonStyle: {
    marginTop: 15,
    borderRadius: 100,
    height: 60,
    backgroundColor: '#7CC143',
    borderWidth: 4,
    borderColor: '#d7ecc5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fbButtonContainer: {
    justifyContent: 'center',
  },
  fbButtonStyle: {
    borderRadius: 100,
    backgroundColor: '#4267b2',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  textWithDivider: {
    color: "black",
    marginVertical: 10,
    paddingHorizontal: 10
  }
});

