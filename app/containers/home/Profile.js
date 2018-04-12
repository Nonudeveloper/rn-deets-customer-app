import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import Header from '../header/Header';
import Icon from 'react-native-vector-icons/FontAwesome';

const info = (<Icon name="info-circle" size={20} color="green" />);

const processOne = require('../../assets/icons/4_burger_btn_onclick.png');
const processTwo = require('../../assets/icons/process_selection_02.png');
const backButton = require('../../assets/icons/add_car_icon_onclick.png');
const vehicleIcon = require('../../assets/icons/car_place_holder.png');
const editButton = require('../../assets/icons/edit_btn.png');

export default class TestComponent extends React.Component {
  constructor(props)
  {
    super(props);

    this.state = { FlatListItems: [
      {key: 'One'},
      {key: 'Two'},
      {key: 'Three'},
      {key: 'Four'},
      {key: 'Five'},
      {key: 'Six'},
      {key: 'Seven'},
      {key: 'Eight'},
      {key: 'Nine'},
      {key: 'Ten'},
      {key: 'Eleven'},
      {key: 'Twelve'}
    ]}
  }

FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#607D8B',
        }}
      />
    );
  }

  GetItem(item) {
   
  console.log(item)

  }
  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.navBar}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')}>
            <Image source={processOne} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View> */}
          <Header 
              headerText={'Select Vehicle'} 
              navigation={this.props.navigation} 
              buttonType={'back'} 
              // titleType={'logo'}
              showRightIcon
              rightText={'Next'}
              onPress={() => this.props.navigation.navigate('selectVehicle')}
              rightImageSource={backButton}
              rightIconType={'image'}
          />
            <FlatList
              data={this.state.FlatListItems}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={({item}) => 
                <View style={styles.vehicleContainer}>
                  <View style={styles.radioButtonContainer}>
                    <TouchableOpacity onPress={() => this.serviceAddress()} >{info}</TouchableOpacity>
                  </View>
                  <View style={styles.vehicleInnerContainer}>
                    <View style={{ flex: 1 }}>
                      <Image source={vehicleIcon} style={{ width: 85, height: 85 }} />
                    </View>
                    <View style={{ flex: 2, paddingTop: 10, paddingLeft: 10 }}>
                      <Text style={{ fontSize: 16, color: 'black' }}>Profildfdfdfdfe</Text>
                      <Text style={{ fontSize: 16, color: 'black' }}>Profile</Text>
                      <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>Profile</Text>
                    </View>
                  </View>
                  <View style={{ paddingRight: 20 }}>
                    <TouchableOpacity onPress={() => this.serviceAddress()} >
                        <Image 
                        source={editButton} 
                        style={{ width: 40, height: 40 }}
                        />
                    </TouchableOpacity>
                  </View>
                </View>}
            />
            <View style={{ paddingRight: 20 }}>
                    <TouchableOpacity onPress={() => this.serviceAddress()} >
                        <Image 
                        source={editButton} 
                        style={{ width: 40, height: 40 }}
                        />
                    </TouchableOpacity>
                  </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowOffset: { height: -5, width: -5 },
    shadowRadius: 10,
    backgroundColor: '#f9f9f9',
},
navBar: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15
},
vehicleContainer: {
  height: 100, 
  backgroundColor: 'white',
  borderBottomWidth: 2, 
  borderBottomColor: '#e0e0e0', 
  borderTopWidth: 2, 
  borderTopColor: '#e0e0e0',
  flexDirection: 'row',
  alignItems: 'center',
  // top: 10
},
radioButtonContainer: {
  paddingLeft: 30, 
  paddingRight: 30
},
vehicleInnerContainer: {
  flex: 1, 
  width: 300, 
  flexDirection: 'row',
}
});
