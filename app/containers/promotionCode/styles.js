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
        height: 50,
        borderRadius: 100,
        borderColor: '#2ea549',
        marginHorizontal: 25, 
        flex: 0, 
        backgroundColor: 'green', 
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
        marginVertical: 60, 
        marginHorizontal: 50 
    },
    textStyle: {
        color: 'black', 
        fontSize: 18, 
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
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 20,
        marginHorizontal: 15,
        height: 40,
        width: 40
    }
});

export default styles;
