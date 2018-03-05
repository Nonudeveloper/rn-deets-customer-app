import { StyleSheet } from 'react-native';

// const window = Dimensions.get('window');

export default StyleSheet.create({
  profilePic: {
        alignItems: 'center',
        justifyContent: 'center',
        // height: 100
       
    },
    circle: {
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#000',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'

    },
    proImageStyle: {
        width: 55,
        height: 55,
        borderRadius: 100
    },
    container: {
    flex: 1,
    flexDirection: 'column',
  },
  t1: {
    flex: 2,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  t2: {
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#1a1a1a'
  },
  t3: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 25
  },
  nextButtonContainer: {
    justifyContent: 'center'
  },
  nextButtonStyle: {
    borderRadius: 100,
    height: 55,
    backgroundColor: '#66cc00',
    borderWidth: 4,
    borderColor: '#bfff80',
    justifyContent: 'center',
    alignItems: 'center'
  },
   formArea: {
        backgroundColor: '#1a1a1a',
    },
    textStyle: {
        color: '#fff'
    },
    licenseStyle: {
        height: 45,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    colContainer: {
        backgroundColor: '#1a1a1a',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15
    },
    colOne: {
        flex: 1,
        borderBottomWidth: 2,
        borderBottomColor: 'grey' 
    },
    colTwo: {
        flex: 1,
        borderBottomWidth: 2,
        borderBottomColor: 'grey' 
    },
    pickerStyle: {
        color: 'grey',
        
    },
    inputStyle: {
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        marginHorizontal: 15
    }
});

