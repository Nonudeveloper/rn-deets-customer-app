import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const car = require('../../../assets/icons/car_place_holder.png');
const ratingStartActive = require('../../../assets/icons/rate_star_active.png');
const ratingStartInactive = require('../../../assets/icons/rate_star_inactive.png');
const directionOff = require('../../../assets/icons/direction_off.png');

export default class ServiceDetail extends React.Component {

  render() {
    return (
        <View style={styles.container}>
        {/* <Text>Service Provider Details</Text> */}
            <View 
                style={{ 
                    flex: 1, 
                    backgroundColor: '#fff', 
                    marginBottom: 15,
                    borderTopColor: '#000',
                    borderTopWidth: 1,
                    borderBottomColor: '#000',
                    borderBottomWidth: 1,

                }}
            >
                <View style={{ flex: 2, flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1, alignItems: 'center' }}>
                    <View 
                        style={{ flex: 1, alignItems: 'center', marginHorizontal: 10 }}
                    >
                        <Image resizeMode={'contain'} style={{ width: 50, height: 50 }} source={car} />
                    </View>

                    <View 
                        style={{ flex: 3 }}

                    >
                        <Text style={{ color: '#1a1a1a', fontSize: 15 }}>ACURA ILX, 2016,</Text>
                        <Text style={{ color: '#1a1a1a', fontSize: 15 }}>WHITE, HSHSB</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', borderLeftWidth: 1, borderLeftColor: 'grey' }}>
                        <Text color={'#1a1a1a'}>$24</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 10, borderBottomColor: 'grey', borderBottomWidth: 1 }}>
                    <View style={{ flex: 4.1 }}>
                        <Text style={{ fontSize: 14, color: '#000' }}>Exterior Wash (only)</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', borderLeftWidth: 1, borderLeftColor: 'grey' }}>
                        <Text color={'#1a1a1a'}>$24</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: '#000' }}>Notes:</Text>
                        <Text style={{ fontSize: 12, color: 'grey', left: 5 }}>bananascccc</Text>

                    </View>
                </View>

            </View>
        </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'pink'
    },
  
});
