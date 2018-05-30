import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputView: {
        marginTop: 20,
        backgroundColor: '#333333',
    },
    applyButton: {
        height: 45,
        borderRadius: 100,
        borderColor: '#a8a8a8',
        marginHorizontal: 25, 
        flex: 0, 
        backgroundColor: '#8ac10b', 
        marginTop: 20,
        borderWidth: 4,
    },
    inputViewInnerContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingLeft: 10
    },
    textContainer: {
        flex: 3, 
        marginVertical: 20, 
        marginHorizontal: 50 
    },
    textStyle: {
        color: 'black', 
        fontSize: 22, 
        textAlign: 'center'
    },
    iconContainer: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    iconInnerContainer: {
        flex: 1, 
        alignItems: 'center',
        //if icon used
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 50,
        marginHorizontal: 20,
        height: 37
    },
    iconImageStyle: {
        height: '25%', 
        width: '46%'
    }
});

export default styles;
