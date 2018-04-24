import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Button from '../../../deetscomponents/Button';

const visaImage = require('../../../assets/icons/small_VISA.png');
const passwordPoint = require('../../../assets/icons/6_uncheck_btn.png');
const arrowBtn = require('../../../assets/icons/current_arrow_btn.png');

export default class CardDetail extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View 
            style={{ 
                height: 50, 
                backgroundColor: '#fff', 
                borderBottomColor: 'grey', 
                borderTopColor: 'grey', 
                borderTopWidth: 1, 
                borderBottomWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around'
            }}
        >
            <Text style={{ }}>Payment </Text>
            <Image resizeMode={'contain'} style={{ width: 60, height: 30 }} source={visaImage} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image resizeMode={'contain'} style={{ width: 8, height: 8, marginRight: 1 }} source={passwordPoint} />
                <Image resizeMode={'contain'} style={{ width: 8, height: 8, marginRight: 1 }} source={passwordPoint} />
                <Image resizeMode={'contain'} style={{ width: 8, height: 8, marginRight: 1 }} source={passwordPoint} />
                <Image resizeMode={'contain'} style={{ width: 8, height: 8, marginRight: 1 }} source={passwordPoint} />
                <Text style={{ left: 5 }}>1111</Text>
            </View>
            
            <Text style={{ fontWeight: '600' }}> $24 </Text>
            <Image source={arrowBtn} resizeMode={'contain'} style={{ width: 30, height: 30, marginRight: 1 }} />
        </View>
        {/* <Button 
            style={{ 
                height: 45,
                borderRadius: 100,
                borderColor: '#a8a8a8',
                marginHorizontal: 25, 
                backgroundColor: '#8ac10b', 
                borderWidth: 4,
                marginTop: 40
            }}
        >Next</Button> */}
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
  
});
