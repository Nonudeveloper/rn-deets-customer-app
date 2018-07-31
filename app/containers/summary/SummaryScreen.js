import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import Header from '../header/Header';
import Button from '../../deetscomponents/Button';
import styles from './styles';
import ReviewSummary from './ReviewSummary';
import Loader from '../../deetscomponents/Loader';

export default class SummaryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSummaryReview: false
        };
    }

    renderAlert(message) {
        const msg = message.error ? message.error : message.log;
        const heading = message.error ? 'Error' : 'Success';
        Alert.alert(
            heading,
            msg,
            [
                { 
                text: 'OK', 
                onPress: () => {
                //dispath an action to make showAlert false
                    this.props.actions.hideAlert();
                    this.props.navigation.navigate('HomeComponent');
                } 
                },
            ],
            { cancelable: false }
        );
    }

    render() {
        const { user_pending_tip_notifications } = this.props.authUserWholeData;
        return (
            <View style={styles.container}>
                <Header headerText={'summary'} navigation={this.props.navigation} />
                {this.props.tipMessage !== '' && this.renderAlert(this.props.tipMessage)}
                <Loader loading={this.props.isFatching} />
                <View style={styles.container}>
                    { !this.state.showSummaryReview ?
                        <View style={styles.defaultWrapper}>
                            <View style={styles.defaultContainer} >
                                <View style={styles.defaultTextContainer}>
                                    <Text style={styles.defaultTextStyle}>Your service has</Text>
                                    <Text style={styles.defaultTextStyle}>been completed.</Text>
                                </View>
                                <Button 
                                    style={styles.buttonStyle}
                                    onPress={() => this.setState({ showSummaryReview: true })}
                                >
                                    OK
                                </Button>
                            </View>
                        </View>
                     : 
                    <ReviewSummary summaryData={ user_pending_tip_notifications } actions={this.props.actions} />
                    }
                </View>
            </View>
        );
    }
}
