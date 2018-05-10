import React, { Component } from 'react';
import Swipeout from 'react-native-swipeout';
import { Text, TouchableHighlight, View, StyleSheet, Alert } from 'react-native';

class ListItem extends Component {

    getItem(item) {
        Alert.alert(item);
    }

    viewNote = item => {
        console.log(item);
    }
    
    render() {
        const swipeBtns = [
            {
              text: 'Delete',
              backgroundColor: 'red',
              underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
              onPress: () => { this.deleteNote(this.props.item); }
           },
            {
              text: 'Duplicate',
              backgroundColor: 'blue',
              underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
              onPress: () => { this.duplicateNote(this.props.item); }
           }
        ];

        return (
            <Swipeout 
                right={swipeBtns}
                autoClose
                backgroundColor='transparent'
            >
                <TouchableHighlight
                    onPress={this.viewNote.bind(this, this.props.item)} 
                    key={this.props.item.key}
                >
                    <View style={styles.itemContainer}>
                        <View style={styles.itemDetailContainer}>
                            <View style={styles.avatarContainer}>
                                <View style={styles.avatar}>
                                </View>
                            </View>
                            <View style={styles.appointmentDetails}>
                                <View style={styles.text}>
                                    <Text 
                                        style={styles.item} 
                                        onPress={this.getItem.bind(this, this.props.item.key)} 
                                    > 
                                        {this.props.item.appointment.service_name} 
                                    </Text>
                                    <Text>Service End Time: {this.props.item.appointment.service_end_time}</Text>
                                </View>
                                <View style={styles.location}>
                                    <Text>{this.props.item.appointment.service_location_string}</Text>
                                </View>
                                {/* <Text>Cost: {this.props.item.appointment.total_cost}</Text> */}
                            </View>
                            <View style={styles.options}>
                                <Text>Options</Text>
                            </View>
                        </View>
                        <View style={styles.locationContainer}>
                            <Text>{this.props.item.appointment.service_location_string}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </Swipeout>
        );
    }
}

export default ListItem;

const styles = StyleSheet.create({
    mainContainer: {
        // Setting up View inside content in Vertically center.
        justifyContent: 'center',
        flex: 1,
        margin: 10
    },
     
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    itemContainer: {
        flex: 1,
    },
    avatarContainer: {
        flex: 1.5,
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        backgroundColor: 'grey',
        height: 70,
        width: 70,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#fff'
    },
    options: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    appointmentDetails: {
        flex: 3,
        backgroundColor: 'grey',
        justifyContent: 'center'
    },
    itemDetailContainer: {
        flex: 1,
        flexDirection: 'row'
    }
});
