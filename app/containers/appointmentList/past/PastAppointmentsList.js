import React, { Component } from 'react';
import { Text, View, FlatList, Alert, StyleSheet, TouchableHighlight } from 'react-native';
import Swipeout from 'react-native-swipeout';
import Header from '../../header/Header';
import ListItem from './ListItem';

class PastAppointmentsList extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.fetchUpcomingAndPastAppointments();
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

    renderItem(item) {
        return (
            <ListItem item={item} />
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

export default PastAppointmentsList;
