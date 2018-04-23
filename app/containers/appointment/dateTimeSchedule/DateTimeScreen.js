import React from 'react';
import { View, Image, Text, Modal, FlatList, ScrollView } from 'react-native';
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
    this.state = {
        date: '2016-05-15',
        modalVisible: false,
        data: [],
        time: [],
        selectedItem: '',
        selectedDate: ''
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
    <Calender setModalVisible={this.setModalVisible} getSelectedDate={this.getSelectedDate.bind(this)} />
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
              selectedItem: item
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

  render() {
    console.log(this.state);
    // const { isFetching } = this.props;
    const today = new Date();
    const date = today.toDateString();
    return (
      <View style={styles.container}>
        <Header 
            headerText={'Deets'} 
            navigation={this.props.navigation} 
            headerText={'Date & Time'}
            // showRightIcon
            // rightText={'Next'}
            // onPress={() => this.props.navigation.navigate('selectVehicle')}
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
                      <View style={{ flex: 1 }}>
                        <Image source={vehicleIcon} style={{ width: 80, height: 80 }} />
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
                            <Text 
                              key={time.key}
                              onPress={this.changeActiveRadioButton.bind(this, time.key, item)}
                              style={time.selected ? styles.scrollViewSelectedText : styles.scrollViewText}
                            >{time.timeavailable}</Text>)}
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
