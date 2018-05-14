import { StyleSheet, Dimensions } from 'react-native';


export default StyleSheet.create({
  container: {
      flex: 1,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#00000040',
  },
  modalContentContainer: {
    backgroundColor: '#e6e6e6',
    height: 500,
    width: Dimensions.get('window').width - 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  modalHeaderContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    top: 8,
    height: 40,
    borderBottomColor: '#a8a8a8', 
    borderBottomWidth: 1 
  },
  cancelContainer: { 
    flex: 1, 
    left: 10 
  },
  titleContainer: { 
    flex: 1, 
    position: 'absolute'
  },
  title: { 
    fontWeight: 'bold', 
    color: '#1a1a1a',
    fontSize: 20 
  },
  modalBodyContainer: {
    flex: 1,
    position: 'relative',
    top: 30,
    justifyContent: 'flex-start'
  },
  cardImage: {
    resizeMode: 'contain', 
    width: 80, 
    height: 20 
  },
  paypalImg: {
    resizeMode: 'contain', 
    width: 80, 
    height: 20,
  },
  boldText: {
    // fontWeight: 'bold', 
    color: '#1a1a1a',
    fontSize: 20 
  },
  paymentItem: { 
    flexDirection: 'row', 
    height: 40, 
    alignItems: 'center', 
    borderBottomColor: '#a8a8a8', 
    borderBottomWidth: 1
  },
  cardBigImage: {
    resizeMode: 'contain', 
    width: 100, 
    height: 100 
  },
  switch: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  container2: {
    backgroundColor: '#333333',
    marginTop: 60,
  },
  label: {
    color: 'black',
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: 'grey',
  },
  modelCancelText: {
    color: '#4da6ff', 
    fontSize: 20,
  },
  flatlistContainer: {
    flex: 1, 
    justifyContent: 'space-around'
  },
  recentText: {
    fontSize: 20, 
    paddingLeft: 20
  },
  otherText: {
    fontSize: 20, 
    paddingLeft: 20
  },
  flatlistBodyOuterContainer: {
    justifyContent: 'space-around',
    marginLeft: 20
  },
  TouchableHighlightOuterContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  TouchableHighlightInnerContainer: {
    height: 110,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', 
    borderRadius: 10
  },
  paymentTypeContainer: {
    justifyContent: 'center',
    alignItems: 'center', 
    height: 30
  },
  paymentTypeText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  cardDetailBodyContainer: {
    height: 50, 
    backgroundColor: '#fff', 
    borderBottomColor: 'grey', 
    borderTopColor: 'grey', 
    borderTopWidth: 1, 
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  passwordImageContainer: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  passwordImage: {
    width: 8, 
    height: 8, 
    marginRight: 1
  },
  serviceProviderContainer: {
    flex: 1, 
    backgroundColor: '#fff', 
    marginVertical: 15,
    borderTopColor: '#000',
    borderTopWidth: 1,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  providerInfoContainer: {
    flex: 2, 
    flexDirection: 'row',
     marginTop: 4, 
     borderBottomColor: 'grey', 
     borderBottomWidth: 1, 
     marginHorizontal: 30
  },
  providerInfoImageStyle: {
    width: '80%', 
    height: '80%'
  },
  providerNameText: {
    color: '#1a1a1a', 
    fontSize: 20
  },
  providerRatingContainer: {
    flexDirection: 'row', 
    marginTop: 5
  },
  providerInfoText: {
    fontSize: 16, 
    color: '#1a1a1a'
  },
  providerAddressContainer: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  addressImageContainer: {
    flex: 0, 
    width: 40, 
    marginLeft: 30, 
    marginRight: 10, 
    borderRightWidth: 1, 
    borderRightColor: 'grey'
  },
  ratingImageStyle: {
    width: 16, 
    height: 16, 
    marginRight: 4
  },
  serviceContainer: {
    flex: 1, 
    backgroundColor: '#fff', 
    marginBottom: 15,
    borderTopColor: '#000',
    borderTopWidth: 1,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  vehicleInfoContainer: {
    flex: 1.5, 
    flexDirection: 'row', 
    borderBottomColor: 'grey', 
    borderBottomWidth: 1, 
    alignItems: 'center',
    marginTop: 4
  },
  vehicleImageContainer: {
    flex: 1, 
    alignItems: 'center', 
    marginHorizontal: 30
  },
  vehicleNameText: {
    color: '#1a1a1a', 
    fontSize: 20
  },
  vehicleColorText: {
    color: '#1a1a1a', 
    fontSize: 25
  },
  serviceMainText: {
    fontSize: 20, 
    color: '#1a1a1a'
  },
  vehicleCostContainer: {
    flex: 1, 
    alignItems: 'center', 
    borderLeftWidth: 1, 
    borderLeftColor: 'grey'
  },
  serviceDetailContainer: {
    marginHorizontal: 30,
    flex: 2, 
    flexDirection: 'column', 
    marginVertical: 5, 
    alignItems: 'center', 
    borderBottomColor: 'grey', 
    borderBottomWidth: 1
  },
  costTextStyle: {
    fontSize: 20, 
    color: '#1a1a1a'
  },
  serviceDetailInnerConatainer: {
    flex: 1, 
    flexDirection: 'row'
  },
  serviceNameTextStyle: {
    fontSize: 20, 
    color: '#000'
  },
  serviceDetailCostContainer: {
    flex: .5, 
    alignItems: 'flex-end', 
    justifyContent: 'flex-end',
    borderLeftWidth: 1, 
    borderLeftColor: 'grey' 
  },
  serviceAddonConatiner: {
    flex: 2, 
    flexDirection: 'row'
  },
  addonsTextStyle: {
    fontSize: 16, 
    color: '#000'
  },
  addonsInnerConatainer: {
    flex: 1, 
    flexDirection: 'row'
  },
  addonsCostConatiner: {
    flex: 1, 
    alignItems: 'flex-end', 
    borderLeftWidth: 1, 
    borderLeftColor: 'grey'
  },
  notesContainer: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginLeft: 10
  },
  notesInnerContainer: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  notesMainTextStyle: {
    fontSize: 20, 
    color: '#000'
  },
  notesValueTextStyle: {
    fontSize: 16, 
    color: 'grey', 
    left: 5
  }

});
