import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../../header/Header';
import ListItem from '../ListItem';

class UpcomingAppointmentsList extends Component {

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
            <ListItem item={item} navigation={this.props.navigation} />
        );
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Header 
                    navigation={this.props.navigation} 
                    headerText={'Appointments'}
                    rightText={'Edit'}
                    showRightIcon
                />
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
   
     
});

export default UpcomingAppointmentsList;
