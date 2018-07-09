import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Header from '../header/Header';
import Button from '../../deetscomponents/Button';
import styles from './styles';
import ReviewSummary from './ReviewSummary';

export default class SummaryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSummaryReview: false
        };
    }

    render() {
        const { user_pending_tip_notifications } = this.props.authUserWholeData;
        return (
            <View style={styles.container}>
                <Header headerText={'summary'} navigation={this.props.navigation} />
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
                    <ReviewSummary summaryData={ user_pending_tip_notifications } />
                    }
                </View>
            </View>
        );
    }
}
