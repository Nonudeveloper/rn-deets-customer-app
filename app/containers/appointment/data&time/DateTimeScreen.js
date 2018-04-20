import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Text, Modal, Dimensions, FlatList, ScrollView } from 'react-native';
import Header from '../../header/Header';
import { getItem } from '../../../helpers/asyncStorage';
import Loader from '../../../deetscomponents/Loader';
import Button from '../../../deetscomponents/Button';
import StyleConstants from '../../../config/StyleConstants';
// import Calendar from 'react-native-calendar-select';
import Calendar from 'react-native-calendar';
import { getAvailability } from './api';



const indicatorOne = require('../../../assets/icons/process2.png');
const crossButton = require('../../../assets/icons/7_calender_cross_btn.png');
const rightButton = require('../../../assets/icons/7_calender_right_btn.png');
const vehicleIcon = require('../../../assets/icons/tech_placeholder.png');
const starOn = require('../../../assets/icons/starOn.png');
const starOff = require('../../../assets/icons/starOff.png');

export default class DateTimeScreen extends React.Component {

  constructor(props) {
    super(props);
    // this.props.actions.fetchServices();
    this.state = {
        date: '2016-05-15',
        modalVisible: false,
        data: [],
        time: [],
        selectedItem: '', 
      FlatListItems: [
          {key: '0:00'},
          {key: '0:30'},
          {key: '1:00'},
          {key: '1:30'},
          {key: '2:00'},
          {key: '2:30'},
          {key: '3:00'},
          {key: '3:30'},
          {key: '4:00'},
          {key: '4:30'},
          {key: '5:00'},
          {key: '5:30'},
          {key: '6:00'},
          {key: '6:30'},
          {key: '7:00'},
          {key: '7:30'},
          {key: '8:00'},
          {key: '8:30'},
          {key: '9:00'},
          {key: '9:30'},
          {key: '10:00'},
          {key: '10:30'},
          {key: '11:00'},
          {key: '11:30'},
          {key: '12:00'},
          {key: '12:30'},
          {key: '13:00'},
          {key: '13:30'},
          {key: '14:00'},
          {key: '14:30'},
          {key: '15:00'},
          {key: '15:30'},
          {key: '16:00'},
          {key: '16:30'},
          {key: '17:00'},
          {key: '17:30'},
          {key: '18:00'},
          {key: '19:00'},
          {key: '20:00'},
          {key: '20:30'},
          {key: '21:00'},
          {key: '21:30'},
          {key: '22:00'},
          {key: '22:30'},
          {key: '23:00'},
          {key: '23:30'},
          {key: '24:00'},
          {key: '24:30'},
        ]
      };
  }

  componentDidMount() {
    // if (this.props.services.length === 0) {
    //   this.props.actions.fetchServices();
    // }
    getAvailability()
        .then(res => {
          const nw = this.getTechnicanAvailability(res);
          console.log(nw)
          this.setState({ data: res, time: nw })
        })
        .catch(err => alert("An error occurred"));
  }
renderModal = () => {
  const customStyle = {
    calendarContainer: {
      backgroundColor: StyleConstants.LoginButtonBColor,
      bottom: 0
    },
    calendarControls: {
      display: 'none',
    },
    calendarHeading: {
      backgroundColor: StyleConstants.LoginButtonBColor,
      borderBottomColor: StyleConstants.LoginButtonBColor,
    },
    controlButtonText: {
      // color: 'blue',
    },
    day: {
      color: 'white',
      fontSize: 20, 
      textAlign: 'center'
    },
    dayHeading: {
      color: 'white',
      fontSize: 20
    },
    dayButton: {
      backgroundColor: StyleConstants.LoginButtonBColor,
    },
    weekendDayButton: {
      backgroundColor: StyleConstants.LoginButtonBColor,
      // color: 'white',
    },
    currentDayCircle: {
      backgroundColor: 'gray',
      borderRadius: 0,
    },
    currentDayText: {
      color: 'blue',
    },
    weekendHeading: {
      fontSize: 20,
      color: 'white',
    },
    weekendDayText: {
      color: 'white',
    },
    selectedDayText: {
      color: StyleConstants.LoginButtonBColor,
    },
  };
    return (
      
    <Modal
            visible={this.state.modalVisible} 
            transparent
            animationType={'none'}
            onRequestClose={() => console.log('hjk')}
        >
           <View style={styles.modalBackground}>
                <View style={styles.modalContentContainer}>
                  <View style={styles.modalHeaderContainer}>
                    <View style={styles.cancelContainer}>
                      <TouchableHighlight
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}
                        style={styles.cancelStyle}
                      >
                        <Image source={crossButton} style={styles.paypalImg} style={{ width: 30, height: 30 }} />
                      </TouchableHighlight>
                    </View>
                    <View style={styles.titleContainer}>
                      {/* <Text style={styles.title}>Select Payment Method</Text> */}
                    </View>
                    <View style={{}}>
                      <TouchableHighlight
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}
                        style={styles.cancelStyle}
                      >
                        <Image source={crossButton} style={styles.paypalImg} style={{ width: 30, height: 30 }} />
                      </TouchableHighlight>
                    </View>
                  </View>
                  <View style={styles.modalBodyContainer}>
                  <Calendar
                    currentMonth={'2015-08-15'}       // Optional date to set the currently displayed month after initialization
                    customStyle={customStyle} // Customize any pre-defined styles
                    // dayHeadings={Array}               // Default: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                    // eventDates={['2015-07-01']}       // Optional array of moment() parseable dates that will show an event indicator
                    // events={[{date:'2015-07-01'}]}// Optional array of event objects with a date property and custom styles for the event indicator
                    // monthNames={Array}                // Defaults to english names of months
                    nextButtonText={'Next'}           // Text for next button. Default: 'Next'
                    onDateSelect={(date) => this.onDateSelect(date)} // Callback after date selection
                    onDateLongPress={(date) => this.onDateLongPress(date)} // Callback after date is long pressed
                    onSwipeNext={this.onSwipeNext}    // Callback for forward swipe event
                    onSwipePrev={this.onSwipePrev}    // Callback for back swipe event
                    onTouchNext={this.onTouchNext}    // Callback for next touch event
                    onTouchPrev={this.onTouchPrev}    // Callback for prev touch event
                    onTitlePress={this.onTitlePress}  // Callback on title press
                    prevButtonText={'Prev'}           // Text for previous button. Default: 'Prev'
                    removeClippedSubviews={false}     // Set to false for us within Modals. Default: true
                    // renderDay={<CustomDay />} 
                    varticle
                    scrollEnded={true}       // Optionally render a custom day component
                    scrollEnabled={true}              // False disables swiping. Default: False
                    selectedDate={'2015-08-15'}       // Day to be selected
                    showControls={false}               // False hides prev/next buttons. Default: False
                    showEventIndicators={true}        // False hides event indicators. Default:False
                    startDate={'2015-08-01'} 
                    endDate={'2015-08-08'}         // The first month that will display. Default: current month
                    titleFormat={'MMMM YYYY'}         // Format for displaying current month. Default: 'MMMM YYYY'
                    today={'2015-08-15'}              // Defaults to today
                    weekStart={1} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
                  />
                  </View>
                </View>
            </View>
        </Modal>
    );
  }

setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  GetItem (item) {
   
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

    changeActiveRadioButton(key,data) {
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
      // this.setState({
      //   radioItems: this.state.radioItems
      // });
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
                <View style={{flex:1}}>
                  <View style={styles.vehicleContainer}>
                <View style={styles.vehicleInnerContainer}>
                <View style={{ flex: 1 }}>
                    <Image source={vehicleIcon} style={{ width: 80, height: 80 }} />
                </View>
                 <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-between' }}>
                      {/* <Text style={styles.vehicleFont}></Text> */}
                    <Text style={styles.licenceFont}>{item.technician.first_name} {item.technician.last_name}</Text>
                    
                    <View style={{ top: 10, flexDirection: 'row' }}>
                    {this.getAverageRating(item.technician.average_rating)}
                        {/* <Image source={starOn} style={{ width: 20, height: 20, marginHorizontal: 3 }} />
                        <Image source={starOn} style={{ width: 20, height: 20, marginHorizontal: 3 }} />
                        <Image source={starOn} style={{ width: 20, height: 20, marginHorizontal: 3 }} />
                        <Image source={starOn} style={{ width: 20, height: 20, marginHorizontal: 3 }} />
                        <Image source={starOff} style={{ width: 20, height: 20, marginHorizontal: 3 }} /> */}
                        <Text style={styles.vehicleFont}>({item.technician.average_rating})</Text>
                    </View>
                </View>
            </View>
        </View>
        {/* {console.log(item.interval)} */}
        <View style={{top:1, height: 80, backgroundColor: '#333333', flexDirection: 'row'}}>
                <View style={{ flex:5, borderLeftColor:'gray', alignItems: 'center', borderLeftWidth: 2, marginVertical:20, marginHorizontal:20}}>
                <ScrollView horizontal styles={{}}>
                {item.time.map((time, i) => 
                <Text 
                  key={time.key}
                  onPress={this.changeActiveRadioButton.bind(this, time.key, item)}
                  style={time.selected ? { paddingTop: 5, backgroundColor: StyleConstants.LoginButtonBColor, borderRadius:10,fontSize: 23, color: '#586069', paddingHorizontal:20} : {paddingTop:5,fontSize: 23, color: '#586069', paddingHorizontal:20}}
                >{time.timeavailable}</Text>)}
                
                </ScrollView>
                </View>
                <View style={{flex:1,borderLeftColor: 'gray', borderLeftWidth: 2, marginVertical:20, alignItems: 'center'}}>
                <Text style={{ alignItems: 'center',paddingTop:5,fontSize: 23, color: '#586069'}}>hrs</Text>
                  </View>
        </View>
                </View>}
            keyExtractor={(item, index) => index.toString()}
        />
        
        {/* <ServicesList services={this.props.services} navigation={this.props.navigation} /> */}
        {this.renderModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonStyle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    nextButtonStyle: {
        marginTop: 15,
        borderRadius: 100,
        height: 60,
        backgroundColor: StyleConstants.LoginButtonBColor,
        borderWidth: 4,
        borderColor: '#d7ecc5',
        justifyContent: 'center',
        alignItems: 'center',
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
        // top: 10,
        paddingHorizontal: 20
      },
      radioButtonContainer: {
          paddingHorizontal: 17
      },
      vehicleInnerContainer: {
        flex: 1, 
        width: 300, 
        flexDirection: 'row',
        alignItems: 'center',
      },
      selectedArrayItemsBtn:
        {
          marginTop: 20,
          padding: 10,
          backgroundColor: 'rgba(0,0,0,0.6)',
          alignSelf: 'stretch'
        },
        nextButtonContainer: {
          paddingBottom: 20,
      },
      vehicleFont: { 
        fontSize: 16, 
        color: '#586069',
        marginHorizontal: 3
      },
      licenceFont: { 
        fontSize: 25, 
        color: '#586069', 
        // fontWeight: 'bold',
        top:0
      },
      modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: '#00000040',
      },
      modalContentContainer: {
        backgroundColor: StyleConstants.LoginButtonBColor,
        height: 400,
        width: Dimensions.get('window').width,
        // borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'flex-start',
      },
      modalHeaderContainer: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        top: 8,
        height: 40,
      },
      cancelContainer: { 
        flex: 1, 
        left: 10 
      },
      titleContainer: { 
        flex: 1, 
        position: 'absolute'
      },
      title: { 
        fontWeight: 'bold', 
        color: '#1a1a1a' 
      },
      modalBodyContainer: {
        position: 'relative',
        top: 30,
        justifyContent: 'flex-start'
      },
      cardImage: {
        resizeMode: 'contain', 
        width: 80, 
        height: 20 
      },
      paypalImg: {
        resizeMode: 'contain', 
        width: 80, 
        height: 20 
      },
      boldText: {
        fontWeight: 'bold', 
        color: '#1a1a1a' 
      },
      paymentItem: { 
        flexDirection: 'row', 
        height: 40, 
        alignItems: 'center', 
        borderBottomColor: '#a8a8a8', 
        borderBottomWidth: 1 
      },
      cardBigImage: {
        resizeMode: 'contain', 
        width: 100, 
        height: 100 
      },
      switch: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
      },
      container2: {
        backgroundColor: '#333333',
        marginTop: 60,
      },
      label: {
        color: 'black',
        fontSize: 12,
      },
      input: {
        fontSize: 16,
        color: 'grey',
      },
});
