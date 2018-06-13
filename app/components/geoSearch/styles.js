import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      marginTop: 22
    },
    textinput: {
        color: 'grey',
        paddingTop: 10
    },
    listViewContainer: {
      zIndex: 99
    },
    listView: {
      backgroundColor: '#fff',
    },
    listItem: {
      padding: 10,
    },
    listItemSeparator: {
      borderWidth: 0.5,
      borderColor: 'lightgrey',
    },
    searchContainer: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      marginHorizontal: 10,
      height: 40,
      shadowColor: 'lightgrey',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 8,
    },
    mapMarkerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputContainer: {
      flex: 9
    }

  });

export default styles;
