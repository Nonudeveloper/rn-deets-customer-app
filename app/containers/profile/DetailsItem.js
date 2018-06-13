import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import ProfilePic from './ProfilePic';
import FormArea from './Form';
import styles from './styles';

const logOutButton = require('../../assets/icons/logout_pressed.png');

export default class DetailsItem extends React.Component {
  constructor(props) {
    super(props);
   
  }

  _logout() {
    this.props.logout();
  }

  render() {
    return (
        <View style={{ flex: this.props.flex, opacity: this.props.opacity }}>
            <View style={styles.pictureWraper}>
                <View style={styles.profilePicContainer}>
                    <ProfilePic getImage={this.props.getImage} editable={this.props.editable} getImage={this.props.getImage} profilePic={this.props.profilePic} />
                </View>
                <View style={styles.logoutButtonContainer}>
                    {/* <Image 
                        style={{ width: '66%', height: '50%', }}
                        source={logOutButton}
                    /> */}
                    <TouchableHighlight underlayColor={'transparent'} style={{ flex: 1, position: 'absolute' }} onPress={this._logout.bind(this)} >
                            <Image style={{ width: 100, height: 58 }} source={logOutButton} />
                        </TouchableHighlight>
                </View>
            </View>
            <View style={styles.formContainer}>
                <FormArea navigation={this.props.navigation} formEditable={this.props.formEditable} authUser={this.props.authUser} />
            </View>
        </View>
    );
  }
}

