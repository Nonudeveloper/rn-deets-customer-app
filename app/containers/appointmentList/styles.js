import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        // Setting up View inside content in Vertically center.
        justifyContent: 'center',
        flex: 1,
        margin: 10
    },
     
    item: {
        fontSize: 17,
        marginBottom: 5,
        color: '#1a1a1a'
    },
    itemContainer: {
        flex: 1,
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
    },
    image: {
        resizeMode: 'contain',
        height: '100%',
        width: '100%'
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
    },
    appointmentDetails: {
        flex: 3,
        justifyContent: 'center'
    },
    itemDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    locationContainer: {
        height: 30,
        flexDirection: 'row',
    },
    locationIconCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    locationTextCont: {
        flex: 4,
        justifyContent: 'center',
        
    },
    text: {
        fontSize: 15
    },
    messageIcon: {
        marginVertical: 15,
        width: 25,
        height: 25
    },
    dateTime: {
        fontSize: 15,
        color: '#1a1a1a',
    },
    ratingStart: {
        resizeMode: 'contain',
        height: 20,
        width: 20,
        marginRight: 2
    },
    ratingContainer: {
        flexDirection: 'row'
    },
    radioContainer: {
        flex: 0.5,
        justifyContent: 'center'
    },
    radioImage: {
        resizeMode: 'contain',
        width: 20,
        height: 20
    },
    tabsContainer: { 
        flexDirection: 'row',
        backgroundColor: 'green' 
    }
});

export default styles;
