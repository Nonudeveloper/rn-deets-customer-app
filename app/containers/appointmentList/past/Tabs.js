import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

class AppointmentTabs extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', height: 50 }}>
                    <TouchableHighlight 
                        style={{ 
                            flex: 1, 
                            backgroundColor: this.props.selectedTab === 'past' ? '#009933' : '#fff',
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}
                        onPress={() => this.props.onTabClick('past')}
                        activeOpacity={1}
                    >
                        <Text style={{ color: this.props.selectedTab === 'past' ? '#fff' : 'grey', fontSize: 17 }}>Past</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        style={{ 
                            flex: 1, 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            backgroundColor: this.props.selectedTab !== 'past' ? '#009933' : '#fff' 
                        }}
                        onPress={() => this.props.onTabClick('upcoming')}
                        activeOpacity={1}
                    >
                        <Text style={{ fontSize: 17, color: this.props.selectedTab !== 'past' ? '#fff' : 'grey' }}>Upcoming</Text>
                    </TouchableHighlight>
                </View>
        );
    }
}

export default AppointmentTabs;
