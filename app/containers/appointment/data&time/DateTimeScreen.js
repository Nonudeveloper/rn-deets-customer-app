import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Text, Modal, Dimensions } from 'react-native';
import Header from '../../header/Header';
import { getItem } from '../../../helpers/asyncStorage';
import Loader from '../../../deetscomponents/Loader';
import Button from '../../../deetscomponents/Button';
import StyleConstants from '../../../config/StyleConstants';
import Calendar from 'react-native-calendar-select';
import {CalendarList} from 'react-native-calendars';


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
      };
  }

//   componentDidMount() {
//     if (this.props.services.length === 0) {
//       this.props.actions.fetchServices();
//     }
//   }
renderModal = () => {
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
                  </View>
                  <View style={styles.modalBodyContainer}>
                  <CalendarList
                //   style={{
                //     borderWidth: 1,
                //     borderColor: '#ffffff',
                //     height: 100
                //   }}
                  // Specify theme properties to override specific styles for calendar parts. Default = {}
                  theme={{
                    backgroundColor: 'green',
                    calendarBackground: StyleConstants.LoginButtonBColor,
                    textSectionTitleColor: '#ffffff',
                    selectedDayBackgroundColor: '#ffffff',
                    selectedDayTextColor: StyleConstants.LoginButtonBColor,
                    todayTextColor: '#00adf5',
                    dayTextColor: '#ffffff',
                    textDisabledColor: '#d9e1e8',
                    monthTextColor: '#ffffff',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textMonthFontWeight: 'bold',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16
                  }}
                  current={'2012-05-16'} pastScrollRange={24} futureScrollRange={24} />
                  </View>
                </View>
            </View>
        </Modal>
    );
  }

setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { isFetching } = this.props;
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
        <Loader loading={isFetching} />
        <View style={{ marginHorizontal: 25 }}>
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
        <View style={styles.vehicleContainer}>
            <View style={styles.vehicleInnerContainer}>
                <View style={{ flex: 1 }}>
                    <Image source={vehicleIcon} style={{ width: 80, height: 80 }} />
                </View>
                 <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-between' }}>
                      {/* <Text style={styles.vehicleFont}></Text> */}
                    <Text style={styles.licenceFont}>Virgil Pineda</Text>
                    <View style={{ top: 10, flexDirection: 'row' }}>
                        <Image source={starOn} style={{ width: 20, height: 20, marginHorizontal: 3 }} />
                        <Image source={starOn} style={{ width: 20, height: 20, marginHorizontal: 3 }} />
                        <Image source={starOn} style={{ width: 20, height: 20, marginHorizontal: 3 }} />
                        <Image source={starOn} style={{ width: 20, height: 20, marginHorizontal: 3 }} />
                        <Image source={starOff} style={{ width: 20, height: 20, marginHorizontal: 3 }} />
                        <Text style={styles.vehicleFont}>(4.0)</Text>
                    </View>
                </View>
            </View>
        </View>
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
        top: 10,
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
        height: 300,
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
