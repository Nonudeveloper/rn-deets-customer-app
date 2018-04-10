import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
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
        marginLeft: 10 
    },
    serviceNameContainer: { 
        height: 58, 
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
        height: 58, 
        backgroundColor: '#fff', 
        justifyContent: 'center', 
        marginHorizontal: 5 
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
        flexDirection: 'row', 
        justifyContent: 'space-around' 
    },
    dropItem: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    }
});

export default styles;
