import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class AppointmentTabs extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', height: 40 }}>
                    <TouchableOpacity 
                        style={{ 
                            flex: 1, 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            borderColor: 'black',
                            borderWidth: this.props.selectedTab !== 'past' ? 0 : 1, 
                            backgroundColor: this.props.selectedTab !== 'past' ? '#009933' : '#fff' 
                        }}
                        onPress={() => this.props.onTabClick('upcoming')}
                        activeOpacity={1}
                    >
                        <Text style={{ fontSize: 17, color: this.props.selectedTab !== 'past' ? '#fff' : 'black' }}>Upcoming</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ 
                            flex: 1, 
                            backgroundColor: this.props.selectedTab === 'past' ? '#009933' : '#fff',
                            alignItems: 'center', 
                            justifyContent: 'center',
                            borderColor: 'black',
                            borderLeftWidth: 0,
                            borderWidth: this.props.selectedTab === 'past' ? 0 : 1
                        }}
                        onPress={() => this.props.onTabClick('past')}
                        activeOpacity={1}
                    >
                        <Text style={{ color: this.props.selectedTab === 'past' ? '#fff' : 'black', fontSize: 17 }}>Past</Text>
                    </TouchableOpacity>
                </View>
        );
    }
}

export default AppointmentTabs;
