import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    defaultWrapper: {
        height: Dimensions.get('window').height - 300
    },
    defaultContainer: {
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'flex-end', 
        alignItems: 'center'
    },
    defaultTextContainer: {
        height: 100,
        flexDirection: 'column',
        alignItems: 'center'
    },
    defaultTextStyle: {
        fontSize: 25, 
        fontWeight: 'bold', 
        color: 'black', 
        textAlign: 'center'
    },
    buttonStyle: {
        height: 60, 
        marginHorizontal: 30, 
        borderRadius: 50,
        backgroundColor: '#00961C'
    },
    dateTimeContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'flex-end'
    },
    dateTimeTextStyle: {
        fontSize: 23, 
        color: '#818181', 
        paddingHorizontal: 20
    },
    totalPaymentTextContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    totalPaymentTextStyle: {
        fontSize: 33, 
        color: 'black'
    },
    tipCostContainer: {
        flex: 1, 
        backgroundColor: '#222222', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    tipCostTextStyle: {
        fontSize: 33, 
        color: '#6CB21B'
    },
    sliderWrapper: {
        flex: 1.5
    },
    sliderContainer: {
        flex: 1, 
        justifyContent: 'center',
        marginHorizontal: 50
    },
    sliderTextWrapper: {
        flex: 1, 
        flexDirection: 'row' 
    },
    sliderTextStyle: {
        fontSize: 20, 
        color: 'black'
    },
    mainlyUsedContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    hrContainer: {
        flex: 0.5, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    hrTextStyle: {
        fontSize: 25, 
        fontWeight: 'bold', 
        color: '#818181'
    },
    serviceImageContainer: {
        flex: 2, 
        flexDirection: 'row'
    },
    rateTechnicianWrapper: {
        flex: 1, 
        flexDirection: 'row'
    },
    rateTechnicianTextContainer: {
        flex: 2, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    rateTechnicianTextStyle: {
        fontSize: 22, 
        color: '#8F8F8F', 
        fontWeight: 'bold'
    },
    rateTechnicianValueContainer: {
        flex: 0.8, 
        justifyContent: 'center', 
        alignItems: 'flex-end'
    },
    rateTechnicianValueText: {
        fontSize: 22, 
        color: '#8F8F8F', 
        paddingRight: 10
    },
    starsWrapper: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    starImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    starImageStyle: {
        width: 30, 
        height: 30
    },
    buttonContainer: {
        flex: 2, 
        justifyContent: 'center'
    },
    submitButtonStyle: {
        height: 60, 
        backgroundColor: '#0C9B00', 
        marginHorizontal: 30, 
        borderRadius: 50, 
        borderColor: '#24CE5F',
        borderWidth: 5
    }
});

export default styles;
