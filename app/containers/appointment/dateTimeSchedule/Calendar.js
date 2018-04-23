import React from 'react';
import { View, Image, TouchableHighlight, Text, Modal } from 'react-native';
import StyleConstants from '../../../config/StyleConstants';
import { Calendar, CalendarList, LocaleConfig } from 'react-native-calendars';
import styles from './styles';

const crossButton = require('../../../assets/icons/7_calender_cross_btn.png');
const rightButton = require('../../../assets/icons/7_calender_right_btn.png');

LocaleConfig.locales.en = {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['January,', 'February,', 'March,', 'April,', 'May,', 'June,', 'July,', 'August,', 'September,', 'October,', 'November,', 'December,'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  };
  LocaleConfig.defaultLocale = 'en';

  export default class DateTimeScreen extends React.Component {
      constructor(props) {
        super(props);
        
        this.state = {
            selected: this.props.currentDate
        };
      }

    onDayPress(day) {
        this.setState({
          selected: day.dateString
        });
    }

    getDate() {
        this.props.getSelectedDate(this.state.selected);
        this.props.setModalVisible(false);
    }

    render() {
        return (
            <View style={styles.modalBackground}>
            <View style={styles.modalContentContainer}>
              <View style={styles.modalHeaderContainer}>
                <View style={styles.cancelContainer}>
                  <TouchableHighlight onPress={() => { this.props.setModalVisible(false); }} style={styles.cancelStyle} >
                    <Image source={crossButton} style={styles.paypalImg} style={{ width: 30, height: 30 }} />
                  </TouchableHighlight>
                </View>
                <View style={styles.titleContainer}>
                    {/* <Text style={styles.title}>Select Payment Method</Text> */}
                </View>
                <View style={{ paddingRight: 10 }}>
                  <TouchableHighlight onPress={this.getDate.bind(this)} style={styles.cancelStyle} >
                    <Image source={rightButton} style={styles.paypalImg} style={{ width: 30, height: 30 }} />
                  </TouchableHighlight>
                </View>
              </View>
              <View style={styles.modalBodyContainer}>
                <CalendarList
                  style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    height:400
                  }}
                  // currentDate={'2018-04-21'}
                  minDate={'2018-04-10'}
                  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                  maxDate={'2018-04-28'}
                  // onDayPress={(day) => {console.log('selected day', day)}}
                  onDayPress={this.onDayPress.bind(this)}
                  markingType={'custom'}
                  markedDates={{ [this.state.selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    customStyles: {
                      container: {
                        backgroundColor: 'grey',
                        borderRadius: 0,
                        // height: 40,
                        // width: 40,
                        // alignItems: 'center',
                        // justifyContent: 'center'
                      },
                      text: {
                        color: StyleConstants.LoginButtonBColor,
                        // alignItems: 'center',
                      },
                    }
                  }}}
                  // dayComponent={({date, state}) => {
                  //   console.log(date)
                  //   console.log(state)
                  //   return (<View style={{flex: 1}}><Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>{date.day}</Text></View>);
                  // }}
                  // Specify theme properties to override specific styles for calendar parts. Default = {}
                  theme={{
                    backgroundColor: 'green',
                    calendarBackground: StyleConstants.LoginButtonBColor,
                    textSectionTitleColor: '#ffffff',
                    selectedDayBackgroundColor: 'blue',
                    selectedDayTextColor: 'black',
                    todayTextColor: 'blue',
                    dayTextColor: '#ffffff',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'orange',
                    monthTextColor: '#ffffff',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textMonthFontWeight: 'bold',
                    textDayFontSize: 20,
                    textMonthFontSize: 23,
                    textDayHeaderFontSize: 23,
                    'stylesheet.calendar.main': {
                      week: {
                        // marginTop: 5,
                        alignItems: 'center',
                        // marginBottom: 10,
                        height: 55,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottomColor: '#ffffff',
                        borderBottomWidth: 2
                      }
                    },
                    'stylesheet.calendar.header': {
                      week: {
                        marginTop: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }
                    },
                    'stylesheet.day.multiDot': {
                      selected: {
                        backgroundColor: 'grey',
                        borderRadius: 0
                      }
                    }
                  }}
                />
              </View>
            </View>
          </View>
        );
    } 
}
