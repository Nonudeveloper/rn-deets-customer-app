import React from 'react';
import { View, Text } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import { setItem, getItem } from '../../helpers/asyncStorage';

export default class TimeInterval extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialCounter: 0, //Equivalents to 2 minutes
            timeInterval: '00:00:00',
        };
    }

    
    componentDidMount() {
        this.props.onRef(this);
        if (this.props.nextScreenTime && this.props.initialTimeInterval !== 0) {
            this.setState({ initialCounter: this.props.initialTimeInterval });
        } else {
            this.setState({ initialCounter: (new Date() - new Date(this.props.currentRunningAppointments.service_start_time_by_technician)) });
        }
        this.timerInterval();
    }


    // Make sure to unmount the listener when component unmounts
    componentWillUnmount() {
        BackgroundTimer.clearInterval(this.setIntervalId);
        console.log('unmounting');
        this.props.onRef(null);
    }
   

    timerInterval() {
        this.setIntervalId = BackgroundTimer.setInterval(() => {
            if (this.state.initialCounter === 0) {
                this.setState({
                    initialCounter: this.state.initialCounter + 1000,
                    timeInterval: this.msToTime(this.state.initialCounter + 1000)
                });
                this.props.updatedInterval(this.state.initialCounter + 1000);
            } else {
                this.setState({
                    initialCounter: this.state.initialCounter + 1000,
                    timeInterval: this.msToTime(this.state.initialCounter + 1000)
                });
                this.props.updatedInterval(this.state.initialCounter + 1000);
            }
        }, 1000);
    }


    msToTime(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);
    
        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
    
        return hours + ':' + minutes + ':' + seconds;
    }


    stopTimer() {
        BackgroundTimer.clearInterval(this.setIntervalId);
    }


    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <Text style={{ fontSize: 18, paddingLeft: 30 }}>{this.state.timeInterval}</Text>
            </View>
        );
    }
}

