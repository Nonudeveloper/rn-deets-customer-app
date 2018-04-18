import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    selectedArrayItemsBtn: {
      marginTop: 20,
      padding: 10,
      backgroundColor: 'rgba(0,0,0,0.6)',
      alignSelf: 'stretch'
    },
   
    btnText: {
      color: 'white',
      textAlign: 'center',
      alignSelf: 'stretch',
      fontSize: 18
    },
   
    checkBoxButton: {
      marginVertical: 10
    },
   
    checkBoxHolder: {
      flexDirection: 'row',
      alignItems: 'center'
    },
   
    checkedView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
   
    checkedImage: {
      height: '100%',
      width: '100%',
    //   tintColor: 'white',
    //   resizeMode: 'contain',
    },
   
    uncheckedView: {
      flex: 1,
      backgroundColor: 'white',
      borderRadius: 50,
      borderWidth: 1,
    },

    checkBoxLabel: {
      fontSize: 17,
      paddingLeft: 10
    },
  
  });
  
export default styles;
