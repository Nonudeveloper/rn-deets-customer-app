import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        // padding: 10,
        fontSize: 18,
        // height: 44,
    },
    serviceItemContainer: { 
        flex: 1 
    },
    serviceContainer: { 
        flex: 1, 
        flexDirection: 'row', 
        marginVertical: 3 
    },
    serviceInfoContainer: { 
        flex: 1, 
        marginLeft: 10,
        flexDirection: 'column'
    },
    serviceNameContainer: { 
        // height: 58, 
        flex: 1,
        backgroundColor: '#8ac10b', 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    serviceName: { 
        flex: 2, 
        marginHorizontal: 10 
    },
    serviceNameText: { 
        color: '#fff', 
        fontSize: 20 
    },
    servicePrice: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    servicePriceText: { 
        fontSize: 20, 
        color: '#fff' 
    },
    descContainer: { 
        // height: 58, 
        flex: 2,
        backgroundColor: '#fff', 
        justifyContent: 'center', 
    },
    descText: {
        fontSize: 12
    },
    carImage: {
        resizeMode: 'contain',
        width: 115,
        height: 115
    },
    downArrow: {
        resizeMode: 'contain',
        width: 12,
        height: 12,
        marginLeft: 5
    },
    detailInfoContainer: { 
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'space-around' 
    },
    dropItem: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
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
        // borderRadius: 50,
        // borderWidth: 1,
      },
  
      checkBoxLabel: {
        fontSize: 17,
        paddingLeft: 10
      },
      serviceSubCategoryContainer: { 
          flex: 1, 
          height: 65, 
          flexDirection: 'row', 
          alignItems: 'center' 
      },
      addsOnListContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 26
      },
      addsOnTextContainer: {
        flex: 9, 
        flexDirection: 'column'
      },
      addsOnNameText: {
        fontSize: 18, 
        color: 'black'
      },
      addsOnBottomTextContainer: {
        flexDirection: 'row', 
        paddingHorizontal: 5
      },
      addsOnCostText: {
        color: 'black', 
        fontSize: 15
      }
});

export default styles;
