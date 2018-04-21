import { StyleSheet, Dimensions } from 'react-native';
import StyleConstants from '../../../config/StyleConstants';

// const window = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonStyle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
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
    technicianContainer: {
        height: 100, 
        backgroundColor: 'white',
        borderBottomWidth: 2, 
        borderBottomColor: '#e0e0e0', 
        borderTopWidth: 2, 
        borderTopColor: '#e0e0e0',
        flexDirection: 'row',
        alignItems: 'center',
        // top: 10,
        paddingHorizontal: 20
    },
    radioButtonContainer: {
        paddingHorizontal: 17
    },
    technicianInnerContainer: {
        flex: 1, 
        width: 300, 
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedArrayItemsBtn: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignSelf: 'stretch'
    },
     nextButtonContainer: {
        paddingBottom: 20,
    },
    vehicleFont: { 
        fontSize: 16, 
        color: '#586069',
        marginHorizontal: 3
    },
    licenceFont: { 
        fontSize: 25, 
        color: '#586069', 
        // fontWeight: 'bold',
        top: 0
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: '#00000040',
    },
    modalContentContainer: {
        backgroundColor: StyleConstants.LoginButtonBColor,
        height: 350,
        width: Dimensions.get('window').width,
        // borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'flex-start',
    },
     modalHeaderContainer: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        top: 8,
        height: 40,
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
        color: '#1a1a1a' 
    },
    modalBodyContainer: {
        position: 'relative',
        // top: 30,
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
        height: 20 
    },
    boldText: {
        fontWeight: 'bold', 
        color: '#1a1a1a' 
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
    technicianInfoContainer: {
        flex: 3, 
        flexDirection: 'column', 
        justifyContent: 'space-between'
    },
    ratingContainer: {
        top: 10, 
        flexDirection: 'row'
    },
    availabilityOuterContainer: {
        top: 1, 
        height: 80, 
        backgroundColor: '#333333', 
        flexDirection: 'row'
    },
    availabilityInnerContainer: {
        flex: 5, 
        borderLeftColor: 'gray', 
        alignItems: 'center', 
        borderLeftWidth: 2, 
        marginVertical: 20, 
        marginHorizontal: 20
    },
    hourContainer: {
        flex: 1,
        borderLeftColor: 'gray', 
        borderLeftWidth: 2,
        marginVertical: 20, 
        alignItems: 'center'
    },
    hourText: {
        alignItems: 'center',
        paddingTop: 5,
        fontSize: 23, 
        color: '#586069'
    },
    scrollViewText: {
        paddingTop: 5,
        fontSize: 23, 
        color: '#586069', 
        paddingHorizontal: 20
    },
    scrollViewSelectedText: {
        paddingTop: 5, 
        backgroundColor: StyleConstants.LoginButtonBColor, 
        borderRadius: 10,
        fontSize: 23, 
        color: '#586069',
         paddingHorizontal: 20
    }
});

