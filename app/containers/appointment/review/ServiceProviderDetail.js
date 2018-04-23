import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const avatar = require('../../../assets/icons/temp_avatar.png');
const ratingStartActive = require('../../../assets/icons/rate_star_active.png');
const ratingStartInactive = require('../../../assets/icons/rate_star_inactive.png');
const directionOff = require('../../../assets/icons/direction_off.png');

export default class ServiceProviderDetailScreen extends React.Component {

  constructor(props) {
    super(props);
    // this.props.actions.fetchServices();
  }


  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Service Provider Details</Text> */}
        <View 
            style={{ 
                flex: 1, 
                backgroundColor: '#fff', 
                marginVertical: 15,
                borderTopColor: '#000',
                borderTopWidth: 1,
                borderBottomColor: '#000',
                borderBottomWidth: 1,

            }}
        >
            <View style={{ flex: 2, flexDirection: 'row', marginTop: 4, borderBottomColor: 'grey', borderBottomWidth: 1 }}>
                <View 
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                >
                    <Image resizeMode={'contain'} style={{ width: 50, height: 50 }} source={avatar} />
                </View>

                <View 
                    style={{ flex: 3 }}

                >
                    <Text style={{ color: '#1a1a1a', fontSize: 15 }}>Virgil Pineda</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Image resizeMode={'contain'} style={{ width: 13, height: 13, marginRight: 4 }} source={ratingStartActive} />
                        <Image resizeMode={'contain'} style={{ width: 13, height: 13, marginRight: 4 }} source={ratingStartActive} />
                        <Image resizeMode={'contain'} style={{ width: 13, height: 13, marginRight: 4 }} source={ratingStartActive} />
                        <Image resizeMode={'contain'} style={{ width: 13, height: 13, marginRight: 4 }} source={ratingStartActive} />
                        <Image resizeMode={'contain'} style={{ width: 13, height: 13, marginRight: 4 }} source={ratingStartInactive} />
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontSize: 11 }}>Friday, 2 Feb. 2018</Text>
                        <Text style={{ fontSize: 11 }}>11:00 PM to 11:25 PM</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View 
                    style={{ flex: 0, width: 40, marginLeft: 30, marginRight: 10, borderRightWidth: 1, borderRightColor: 'grey' }}
                >
                    <Image source={directionOff} resizeMode={'contain'} style={{ width: 20, height: 20 }} />
                    
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12 }}>9601-9669 Rancho Dr, Escondido, CA...</Text>
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
        // backgroundColor: 'darkkhaki'
    },
  
});
