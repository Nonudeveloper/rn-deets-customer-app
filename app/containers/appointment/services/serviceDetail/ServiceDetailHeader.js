import React from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import styles from '../styles';
import DetailList from './DetailList';
import Button from '../../../../deetscomponents/Button';


const carImage = require('../../../../assets/icons/3_car_img.png');
const downArrow = require('../../../../assets/icons/down_arrow.png');
const upArrow = require('../../../../assets/icons/down_arrow_onclick.png');

export default class ServiceDetailHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        active: 0,
        showServices: true
    };
  }
  
  componentWillMount() {
    // this.props.actions.fetchServices({ access_token: this.props.token });
  }

  toggle = (position) => {
    this.setState({ active: position });
    // if (this.state.active === position) {
    //   this.setState({ active: null });
    // } else {
    //   this.setState({ active: position });
    // }
  }


  myColor = position => {
    if (this.state.active === position) {
        return '#8ac10b';
      }
      return 'grey';
  }

  showServices = () => {
    this.setState({
        showServices: true
    });
    this.toggle(0);
  }

  showAddons = () => {
      this.setState({
        showServices: false
      });
    this.toggle(1);
  }

  render() {
    const { item } = this.props;
    return (
        <View style={{ flex: 4, flexDirection: 'column' }}>
            <View style={[styles.serviceContainer, { flex: 0 }]}>
                <View>
                    <Image style={styles.carImage} source={item.image ? { uri: item.image } : carImage} />
                </View>
                <View style={styles.serviceInfoContainer}>
                    <View style={styles.serviceNameContainer}>
                        <View style={styles.serviceName}>
                            <Text style={styles.serviceNameText}>{item.service_name}</Text>
                        </View>
                        <View style={styles.servicePrice}>
                            <Text style={styles.servicePriceText}>${this.props.selectedVehicle.vehicle_type === 2 ? item.service_Large_cost : item.cost}</Text>
                        </View>
                    </View>
                    <View style={styles.descContainer}>
                        <View style={{ marginHorizontal: 5 }}>
                            <Text style={[styles.descText, { color: '#000' }]}>Estimated Time: {item.estimation_time}</Text>
                            <Text style={[styles.descText, { color: 'grey' }]}>{item.details}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.detailInfoContainer, { flex: 0 }]}>
                <TouchableHighlight onPress={this.showServices} underlayColor={'transparent'}>
                    <View style={styles.dropItem}>
                        <Text style={{ color: this.myColor(0) }}>INCLUDED SERVICES</Text>
                        <Image style={styles.downArrow} source={this.state.showServices ? upArrow : downArrow} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.showAddons} underlayColor={'transparent'}>
                    <View style={styles.dropItem}>
                        <Text style={{ color: this.myColor(1) }}>ADD-ON SERVICES</Text>
                        <Image style={styles.downArrow} source={this.state.showServices ? downArrow : upArrow} />
                    </View>
                </TouchableHighlight>
            </View>
            <View style={{ flex: 1, top: 8 }}>
                <View >
                    <DetailList 
                        servicesList={item.included_adds_on} 
                        addonsList={item.excluded_adds_on} 
                        showServices={this.props.reSchedule ? '' : this.state.showServices} 
                        selectedVehicle={this.props.selectedVehicle}
                        selectedArrayRef={this.props.selectedArrayRef}
                        getSelectedItems={this.props.getSelectedItems}
                        reSchedule={this.props.reSchedule}
                    />
                </View>
                {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <Button 
                        style={{ 
                            height: 50,
                            borderRadius: 100,
                            borderColor: '#a8a8a8',
                            marginHorizontal: 25, 
                            flex: 0, 
                            backgroundColor: '#8ac10b', 
                        }}
                    >Next</Button>
                </View> */}
            </View>
        </View>
        
    );
  }
}
