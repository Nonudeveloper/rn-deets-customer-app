import React, { Component } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import ServiceItem from './ServiceItem'; 
import styles from './styles';

class ServicesList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.reSchedule !== '') {
      if (this.props.services.length !== 0) {
        this.props.services.map((service) => {
          if (service.service_id === this.props.selectedAppointment.appointment.service_id) {
            this.props.navigation.navigate('serviceDetailScreen', { item: service, schedule: 'reschedule' });
          }
        });
      }
    }
  }

  getItem(item) {
    Alert.alert(item);
  }

  flatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  
  // makeRemoteRequest = () => {
  //   const { page, seed } = this.state;
  //   const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
  //   this.setState({ loading: true });
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(res => {
  //       this.setState({
  //         data: page === 1 ? res.results : [...this.state.data, ...res.results],
  //         error: res.error || null,
  //         loading: false,
  //         refreshing: false
  //       });
  //     })
  //     .catch(error => {
  //       this.setState({ error, loading: false });
  //     });
  // };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
            data={this.props.services}
            // ItemSeparatorComponent={this.flatListItemSeparator}
            renderItem={
                ({ item }) => 
                //render a custom item component here
                // <Text 
                //     style={styles.item} 
                //     onPress={this.getItem.bind(this, item.key)} 
                // > {item.key} </Text>
                <ServiceItem navigation={this.props.navigation} item={item} selectedVehicle={this.props.selectedVehicle} />
            }
            keyExtractor={() => Math.random().toString(36).substr(2, 9)}
        />
      </View>
    );
  }
}

export default ServicesList;
