import React from 'react';
import { View, Image, TouchableHighlight, Text } from 'react-native';
import ProfilePic from './ProfilePic';
import FormArea from './Form';
import styles from './styles';

const logOutButton = require('../../assets/icons/logout_pressed.png');
const logOutClosedButton = require('../../assets/icons/logout_closed.png');

export default class DetailsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        marginLeft: 312
    };
  }

  expandLogoutButton() {
      if (this.state.marginLeft === 312) {
        this.setState({
            marginLeft: 260
        });
        return;
      }
      this.setState({
        marginLeft: 312
    });
  }

  _logout = () => {
    this.props.logout();
  }

  render() {
    return (
        <View style={{ flex: this.props.flex, opacity: this.props.opacity, top: 15 }}>
            <View style={styles.pictureWraper}>
                <View style={styles.picContainer}>
                    <ProfilePic 
                        getImage={this.props.getImage} 
                        editable={this.props.editable} 
                        getImage={this.props.getImage} 
                        profilePic={this.props.profilePic} 
                    />
                </View>
                <View style={[styles.logoutButtonContainer, { left: this.state.marginLeft }]}>
                    <TouchableHighlight 
                        underlayColor={'transparent'} 
                        onPress={this.props.logout} 
                        style={[styles.touchableLogoutClosedButtonContainer, { marginLeft: 5 }]}
                        onPress={() => {
                            this.setState({
                                marginLeft: this.state.marginLeft === 312 ? 260 : 312
                            });
                        }}
                    >
                            <Image style={{ width: 20, height: 20 }} source={logOutClosedButton} />
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={'transparent'} onPress={this._logout}>
                        <Text style={{ left: 5 }}>Logout</Text> 
                    </TouchableHighlight>
                </View>
                <FormArea navigation={this.props.navigation} formEditable={this.props.formEditable} authUser={this.props.authUser} />
            </View>
            <View style={styles.formContainer}>
                <FormArea navigation={this.props.navigation} formEditable={this.props.formEditable} authUser={this.props.authUser} />
            </View>
        </View>
    );
  }
}

