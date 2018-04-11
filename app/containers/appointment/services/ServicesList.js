import React, { Component } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import ServiceItem from './ServiceItem'; 
import styles from './styles';

class ServicesList extends Component {
  constructor(props) {
    super(props);

    this.state = { FlatListItems: [
        { key: 'Exterior Wash (only)', time: '25 Mins', desc: 'Great if you wish just to clean the exterior surface of your...' },
        { key: 'Silver Wash', time: '35 Mins', desc: 'Great if you wish just to clean the exterior surface of your...' },
        { key: 'Gold Wash', time: '45 Mins', desc: 'Great if you wish just to clean the exterior surface of your...' },
        { key: 'Four', time: '45 Mins', desc: 'Great if you wish just to clean the exterior surface of your...' },
        { key: 'Five', time: '45 Mins', desc: 'Great if you wish just to clean the exterior surface of your...' },
    ] };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  getItem(item) {
    Alert.alert(item);
  }

  flatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  
  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
            data={this.state.FlatListItems}
            // ItemSeparatorComponent={this.flatListItemSeparator}
            renderItem={
                ({ item }) => 
                //render a custom item component here
                // <Text 
                //     style={styles.item} 
                //     onPress={this.getItem.bind(this, item.key)} 
                // > {item.key} </Text>
                <ServiceItem item={item} />
            }
        />
      </View>
    );
  }
}

export default ServicesList;
