import React from 'react';
import { 
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
 } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import styles from './styles';

const avatar = (<Icon name="user-circle" size={55} color="#333333" />);


export default class ProfilePic extends React.Component {
    
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
            }
        });
    }

    render() {
        return (
            <View style={styles.profilePic}>
            
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    {/* {avatar} */}
                    { this.state.ImageSource === null ? avatar :
                    <Image style={styles.proImageStyle} source={this.state.ImageSource} />
                    }
                </TouchableOpacity>
                
            </View>
        );
    }

    
}