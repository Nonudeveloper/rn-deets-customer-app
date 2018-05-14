import React from 'react';
import { 
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
 } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import styles from './styles';


const carIcon = require('../../../assets/icons/3_car_img.png');
const editBtn = require('../../../assets/icons/edit_btn.png');

export default class CarPicture extends React.Component {
    
    state = {
        ImageSource: null,
    };

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled photo picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
              this.setState({
                ImageSource: source
              });
              this.props.getVehicleImage(response);
            }
        });
    }

    render() {
        return (
            <View style={styles.carPic}>
                <View style={styles.editButtonWrapper}>
                    <Image source={editBtn} style={styles.editIcon} />
                </View>
                <TouchableOpacity style={{ position: 'absolute' }} onPress={this.selectPhotoTapped.bind(this)}>
                    
                    { this.state.ImageSource === null ? <Image style={styles.proImageStyle} source={carIcon} /> :
                    <Image style={styles.proImageStyle} source={this.state.ImageSource} />
                    }
                </TouchableOpacity>
                
            </View>
        );
    }

    
}
