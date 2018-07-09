import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        // Setting up View inside content in Vertically center.
        justifyContent: 'center',
        flex: 1,
        // margin: 10
    },
     
    item: {
        fontSize: 17,
        marginBottom: 2,
        color: '#1a1a1a'
    },
    itemContainer: {
        flex: 1,
        borderBottomColor: '#000'
    },
    avatarContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        height: 70,
        width: 70,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#fff',
        zIndex: 999
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 100
    },
    locationIcon: {
        resizeMode: 'contain',
        height: 25,
        width: 25
    },
    options: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'grey',
        marginVertical: 10
    },
    appointmentDetails: {
        flex: 3,
        justifyContent: 'center'
    },
    itemDetailContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    locationContainer: {
        flex: 1,
        height: 35,
        flexDirection: 'row'
    },
    locationIconCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    locationTextCont: {
        flex: 4,
        justifyContent: 'center',
        left: 10
        
    },
    text: {
        fontSize: 15,
    },
    messageIcon: {
        marginVertical: 15,
        width: 20,
        height: 20
    },
    dateTime: {
        fontSize: 13,
        color: '#1a1a1a',
        top: 3
    },
    ratingStart: {
        resizeMode: 'contain',
        height: 14,
        width: 14,
        marginRight: 6,
        bottom: 2,
        top: 2
    },
    ratingContainer: {
        flexDirection: 'row'
    },
    radioContainer: {
        flex: 0.5,
        justifyContent: 'center',
        left: 10
    },
    radioImage: {
        resizeMode: 'contain',
        width: 20,
        height: 20
    },
    tabsContainer: { 
        flexDirection: 'row',
        backgroundColor: 'green' 
    },
    hrContainer: {
        borderLeftColor: 'grey', 
        borderLeftWidth: 1, 
        marginVertical: 5,
    },
    notAvailableContainer: {
        flex: 1, 
        alignItems: 'center', 
        marginVertical: 20
    },
    notAvailableText: {
        fontSize: 20, 
        color: '#1a1a1a',
        paddingTop: 20, 
        textAlign: 'center'
    },
    notAvailableImage: {
        width: 72, 
        height: 75
    },
    outerTitleContainer: {
        height: 40, 
        backgroundColor: '#e6e6e6', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    outerTitleText: {
        color: '#000', 
        fontSize: 17
    },
    swipOutContainer: {
        height: 150, 
        borderBottomColor: 'grey', 
        borderBottomWidth: 1
    }
});

export default styles;
