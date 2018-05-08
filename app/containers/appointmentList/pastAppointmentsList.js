import React, { Component } from 'react';
import { Text, View, FlatList, Alert, StyleSheet } from 'react-native';

class PastAppointmentsList extends Component {

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

    render() {
        return (
            <View style={styles.mainContainer}>
                <FlatList
                    data={this.props.data}
                    ItemSeparatorComponent={this.flatListItemSeparator}
                    renderItem={
                        ({ item }) => 
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

export default PastAppointmentsList;
