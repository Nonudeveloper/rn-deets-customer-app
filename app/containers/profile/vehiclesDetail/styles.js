import { StyleSheet } from 'react-native';

// const window = Dimensions.get('window');

export default StyleSheet.create({
    carPic: {
        alignItems: 'center',
        justifyContent: 'center',
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
        width: 100,
        height: 100,
        borderRadius: 100
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    t1: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20
    },
    t2: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1
    },
    t3: {
        margin: 25,
        flex: 1
    },
    nextButtonContainer: {
        justifyContent: 'flex-end',
        paddingTop: 23
    },
    nextButtonStyle: {
        borderRadius: 100,
        height: 55,
        // backgroundColor: '#8ac10b',
        borderWidth: 4,
        borderColor: '#bfff80',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formArea: {
        backgroundColor: '#333333',
    },
    textStyle: {
        color: '#fff'
    },
    licenseStyle: {
        height: 45,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingLeft: 23,
        paddingRight: 23
    },
    colContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        paddingLeft: 6
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
        borderBottomColor: 'grey',
        marginHorizontal: 20,
    },
    licenseInnerContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10
    },
    radio1ContainerStyle: {
        flex: 4,
        paddingLeft: 5,
        flexDirection: 'row'
    },
    radio2ContainerStyle: {
        flex: 1,
        paddingLeft: 5,
        flexDirection: 'row'
    },
    licenseTextStyle: {
        // paddingLeft: 10,
        // color: '#bfff80',
    },
    editIcon: {
        resizeMode: 'contain', 
        width: 25, 
        height: 25,
        zIndex: 999,
        // marginRight: 10
    },
    editButtonWrapper: { 
        zIndex: 999, 
        justifyContent: 'flex-end', 
        marginLeft: 73, 
        marginBottom: 78 
    },
    pictureWraper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profilePicContainer: {
        flex: 1.5,
        justifyContent: 'center', 
        alignItems: 'flex-end'
    },
    logoutButtonContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'flex-end' 
    },
    formContainer: {
        flex: 2, 
        flexDirection: 'column'
    },
    stepIndicatorHeader: {
        flex:1,
        height:50,
        // flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 20,
        marginHorizontal: 100
    },
});

