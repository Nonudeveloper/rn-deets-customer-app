import React, { Component } from 'react';
import { Text, View, FlatList, Alert, StyleSheet, TouchableHighlight } from 'react-native';
import Swipeout from 'react-native-swipeout';

class UpcomingAppointmentsList extends Component {

    getItem(item) {
        Alert.alert(item);
    }

    flatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#607D8B',
            }}
          />
        );
    }

    viewNote = item => {
        console.log(item);
    }

    renderItem(item) {
        const swipeBtns = [
            {
              text: 'Delete',
              backgroundColor: 'red',
              underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
              onPress: () => { this.deleteNote(item); }
           },
            {
              text: 'Duplicate',
              backgroundColor: 'blue',
              underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
              onPress: () => { this.duplicateNote(item); }
           }
        ];

        return (
            <Swipeout 
                right={swipeBtns}
                autoClose
                backgroundColor='transparent'
            >
                <TouchableHighlight
                    onPress={this.viewNote.bind(this, item)} 
                    key={item.key}
                >
                    <View style={styles.itemContainer}>
                        <Text 
                            style={styles.item} 
                            onPress={this.getItem.bind(this, item.key)} 
                        > 
                            {item.appointment.service_name} 
                        </Text>
                        <Text>Service End Time: {item.appointment.service_end_time}</Text>
                        <Text>Location: {item.appointment.service_location_string}</Text>
                        <Text>Cost: {item.appointment.total_cost}</Text>
                        
                    </View>
                </TouchableHighlight>
            </Swipeout>
        );
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <FlatList
                    data={this.props.pastAppointments}
                    ItemSeparatorComponent={this.flatListItemSeparator}
                    renderItem={
                        ({ item }) => this.renderItem(item)
                    }
                />
            </View>
        );
    }
}

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
        flex: 1
    }
     
});

export default UpcomingAppointmentsList;
