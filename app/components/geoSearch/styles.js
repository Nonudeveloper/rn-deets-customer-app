import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
    shadowColor: 'lightgrey',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 8,
  },
  textinput: {
    color: 'grey',
    paddingTop: 5,
    marginLeft: 10
  },
  listViewContainer: {
    zIndex: 999,
    marginHorizontal: 10
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
    height: 30,
  },
  titleContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  // mapMarkerContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  inputContainer: {
    flex: 9
  },
  crossButtonContiner: {
    alignItems: 'flex-start', 
    justifyContent: 'center',
    marginRight: 5
  }

});

export default styles;
