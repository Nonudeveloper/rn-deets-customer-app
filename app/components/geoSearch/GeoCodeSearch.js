import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
  ListView, 
  Text, 
  TextInput, 
  TouchableHighlight, 
  View, 
  Keyboard
} from 'react-native';
import styles from './styles';

const mapMarkerIcon = (<Icon name="map-marker" size={30} color="grey" />);
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const MAPBOX_API_KEY = 'pk.eyJ1Ijoic2hpdmFtMTYwMjkxIiwiYSI6ImNqZWZiN3k3bDJmZGkzM2xlbnFuM3J4YWMifQ.NesZbu4KaREG0LWPD5boRA';

export default class GeoCodeSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchedAdresses: this.props.features,
            inputVal: ''
        };
        this.searchLocation = this.searchLocation.bind(this);
    }

    onListItemClicked= (address) => {
        Keyboard.dismiss();
        this.props.onAddressGet(address);
        this.setState({
          searchedAdresses: [],
          inputVal: address.place_name
        });
    }

    searchLocation(query) {
      const data = {
          query,
          MAPBOX_API_KEY
      };

      if (query !== '') {
        //dispatch an action here SEARCH_ADDRESS
        this.props.actions.searchAddress(data); 
        this.setState({
          inputVal: query
        });
      } else {
        //dispath an action here to empty features
        this.props.actions.emptyFeatures();
        this.setState({
          // isLoading: false,
          inputVal: query
        });
      }
    }

    renderAdress = (address) => {
        return (
            <TouchableHighlight onPress={() => this.onListItemClicked(address)} style={styles.listItem}>
                <View>
                    <Text>{address.place_name}</Text>
                </View>
            </TouchableHighlight>
        );
    };

    renderSeparator() {
      return <View style={styles.listItemSeparator} />;
    }

    render() {
        return (
                <View style={styles.container}>
                  <View style={styles.searchContainer}>
                    <View style={styles.mapMarkerContainer}>
                      {mapMarkerIcon}
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                          style={styles.textinput}
                          onChangeText={this.searchLocation}
                          placeholder="Location for service " 
                          underlineColorAndroid='rgba(0,0,0,0)'
                          value={this.state.inputVal}
                          placeholderTextColor="grey"
                      />
                    </View>
                  </View>
                  <View style={styles.listViewContainer}>
                    <ListView
                        dataSource={ds.cloneWithRows(this.props.features)}
                        renderRow={this.renderAdress} 
                        style={styles.listView}
                        renderSeparator={this.renderSeparator}
                        enableEmptySections
                        keyboardShouldPersistTaps='always'
                    />
                  </View>
                </View>
        );
    }
}

