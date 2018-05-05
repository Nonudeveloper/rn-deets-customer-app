import React from 'react';
import { View, Image } from 'react-native';
import ProfilePic from './ProfilePic';
import FormArea from './Form';
import styles from './styles';

const logOutButton = require('../../assets/icons/logout_pressed.png');

export default class DetailsItem extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <View style={styles.container}>
            <View style={styles.pictureWraper}>
                <View style={styles.profilePicContainer}>
                    <ProfilePic getImage={this.props.getImage} editable={this.props.editable} getImage={this.props.getImage} profilePic={this.props.profilePic} />
                </View>
                <View style={styles.logoutButtonContainer}>
                    <Image 
                        style={{ width: '66%', height: '50%', }}
                        source={logOutButton}
                    />
                </View>
            </View>
            <View style={styles.formContainer}>
                <FormArea navigation={this.props.navigation} formEditable={this.props.formEditable} authUser={this.props.authUser} />
            </View>
        </View>
    );
  }
}


