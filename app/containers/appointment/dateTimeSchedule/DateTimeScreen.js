import React from 'react';
import { View, Image, Text, Modal, FlatList, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Header from '../../header/Header';
import Loader from '../../../deetscomponents/Loader';
import Button from '../../../deetscomponents/Button';
import styles from './styles';
import { getAvailability } from './api';
import Calender from './Calendar';


const indicatorOne = require('../../../assets/icons/process2.png');
const vehicleIcon = require('../../../assets/icons/tech_placeholder.png');
const starOn = require('../../../assets/icons/starOn.png');
const starOff = require('../../../assets/icons/starOff.png');

export default class DateTimeScreen extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date();
    const date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + today.getDate();

    this.state = {
        modalVisible: false,
        data: [],
        time: [],
        selectedItem: '',
        selectedDate: date,
        selectedTime: ''
      };
  }

  componentDidMount() {
    // if (this.props.services.length === 0) {
    //   this.props.actions.fetchServices();
    // }
    getAvailability()
        .then(res => {
          const nw = this.getTechnicanAvailability(res);
          this.setState({ data: res, time: nw })
        })
        .catch(err => alert("An error occurred"));
  }
  
  renderModal = () => {
    return (
      <Modal
        visible={this.state.modalVisible} 
        transparent
        animationType={'none'}
        onRequestClose={() => console.log('hjk')}
      >
    <Calender setModalVisible={this.setModalVisible} getSelectedDate={this.getSelectedDate.bind(this)} currentDate={this.state.selectedDate} />
    </Modal>
    );
  }

  getSelectedDate(date) {
    this.setState({
      selectedDate: date
    });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  GetItem(item) {
    console.log(item)
  }

  getAverageRating(stars) {
    const availabilityGrid = [];
    for (let i = 0; i < 5; i++) {
        availabilityGrid.push(<Image source={i < stars ? starOn : starOff} key={i} style={{ width: 20, height: 20, marginHorizontal: 3 }} />);
    }
    return availabilityGrid;
  }
    
  getTechnicanAvailability(data) {
    const availableTime = [];
    if (data.technician) { 
        data.technician.map((tec, i) => {
          const convertedtime = [];
          tec.interval.map((interval, j) => {
            const date = new Date(interval);
            const getTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            convertedtime.push({ key: j, timeavailable: getTime, selected: false });
          });
          availableTime.push({ technician: tec, time: convertedtime });
        });
    }
    return availableTime;
  }

  changeActiveRadioButton(key, data) {
    this.state.time.map((item) => {
      if (item.technician.technician_id === data.technician.technician_id) {
        item.time.map((times) => {
          if (times.key === key) {
             times.selected = true;
            this.setState({
              selectedItem: item,
              selectedTime: times.timeavailable
            });
          } else{
            times.selected = false;
          }
        })
      } else {
        item.time.map((times) => {
            times.selected = false;
        });
      }
    });
  }

  goToNext() {
    if (this.state.selectedItem) {
      this.props.actions.storeAppointmentschedule(this.state);
      this.props.navigation.navigate('notesScreen');
    } else {
      Alert.alert(
        'Error',
        'Select Technican first..'
      );
    }
  }

  render() {
    console.log(this.state)
    // const { isFetching } = this.props;
    const today = new Date(this.state.selectedDate);
    const date = today.toDateString();
    return (
      <View style={styles.container}>
        <Header 
            headerText={'Deets'} 
            navigation={this.props.navigation} 
            headerText={'Date & Time'}
            showRightIcon
            rightText={'Next'}
            onPress={() => this.goToNext()}
            indicatorSource={indicatorOne}
        />
        {/* <Loader loading={isFetching} /> */}
        <View style={{ marginHorizontal: 25, bottom: 7 }}>
          <Button 
              style={styles.nextButtonStyle}
              buttonTextStyle={styles.buttonStyle}
              onPress={() => {
                  this.setModalVisible(true);
              }}
          >
            {date}
          </Button>
        </View>
        <FlatList
            data={this.state.time}
            extraData={this.state} 
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item }) => 
                <View style={{ flex: 1 }}>
                  <View style={styles.technicianContainer}>
                    <View style={styles.technicianInnerContainer}>
                      <View style={{ flex: 1, }}>
                        <Image source={item.technician.image ? { uri: item.technician.image } : vehicleIcon} style={{ width: '80%', height: '80%' }} />
                      </View>
                      <View style={styles.technicianInfoContainer}>
                          <Text style={styles.licenceFont}>{item.technician.first_name} {item.technician.last_name}</Text>
                          <View style={styles.ratingContainer}>
                            {this.getAverageRating(item.technician.average_rating)}
                            <Text style={styles.vehicleFont}>({item.technician.average_rating})</Text>
                          </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.availabilityOuterContainer}>
                    <View style={styles.availabilityInnerContainer}>
                      <ScrollView horizontal styles={{}}>
                          {item.time.map((time, i) => 
                            <TouchableOpacity 
                              key={time.key}
                              onPress={this.changeActiveRadioButton.bind(this, time.key, item)}
                            >
                              <Text style={time.selected ? styles.scrollViewSelectedText : styles.scrollViewText}>{time.timeavailable}</Text>
                            </TouchableOpacity>)}
                      </ScrollView>
                    </View>
                    <View style={styles.hourContainer}>
                      <Text style={styles.hourText}>hrs</Text>
                    </View>
                  </View>
                </View>}
            keyExtractor={(item, index) => index.toString()}
        />
        {this.renderModal()}
      </View>
    );
  }
}
