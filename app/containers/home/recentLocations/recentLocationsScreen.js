import React from 'react';
import { Text, View, FlatList, Alert, Image, TouchableOpacity } from 'react-native';
import Header from '../../header/Header';
import Loader from '../../../deetscomponents/Loader';
import Swipeout from 'react-native-swipeout';
import styles from './styles';


const mapImage = require('../../../assets/icons/map.png');

export default class RecentLocationsScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.recentLocations === '') {
            this.props.actions.fetchRecentLocations();
        }
    }

    flatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#aaa',
            }}
          />
        );
    }

    deleteLocation(id) {
        this.props.actions.deleteRecentLocation(id);
    }
    
    renderAlert(message) {
        const msg = message.error ? message.error : message;
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
                } 
                },
            ],
            { cancelable: false }
        );
    }

    navigateToMap = (item) => {
        this.props.navigation.navigate('HomeComponent', { location: item });
    }

    renderItem(item) {
        const rightSwipeBtns = [
            {
              text: 'Delete',
              backgroundColor: '#ff3300',
              underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
              onPress: () => { this.deleteLocation(item.id); }
           }
        ];
        return (
            <Swipeout 
                right={rightSwipeBtns}
                autoClose
                backgroundColor='transparent'
            >
                <TouchableOpacity style={styles.bodyContainer} onPress={() => this.navigateToMap(item)}>
                    <View style={styles.mapImageContainer}>
                        <Image source={mapImage} style={styles.imageStyle} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>{item.service_location_string}</Text>
                    </View>
                </TouchableOpacity>
            </Swipeout>
        );
    }
  
    render() {
        return (
        <View style={styles.container}>
            <Header 
                navigation={this.props.navigation} 
                headerText={'RECENT LOCATIONS'}
            />
            <Loader loading={this.props.isFetching} />
            {this.props.errorMessage !== '' && this.renderAlert(this.props.errorMessage)}
            <View style={styles.mainContainer}>
                <FlatList
                    data={this.props.recentLocations}
                    ItemSeparatorComponent={this.flatListItemSeparator}
                    renderItem={
                        ({ item }) => this.renderItem(item)
                    }
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state}
                />
            </View>
        </View>
        );
    }
}
