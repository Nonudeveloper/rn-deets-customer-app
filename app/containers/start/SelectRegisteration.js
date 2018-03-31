import React from 'react';
import { Text, View, TouchableOpacity, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Hr from '../../components/hr';
import Header from '../header/Header';
import DeetsFacebook from '../../components/facebook';
import StyleConstants from '../../config/StyleConstants';
//Make Select Register component

const SelectRegisteration = (props) => {
    const { 
        container
    } = styles;


    const registerWithEmail = () => {
        props.navigation.navigate('personalInformation');
    };

    return (
        <View style={container}>
        
            <Header headerText={'Registration'} navigation={props.navigation} />
            
            <DeetsFacebook title="Register with Facebook" navigation={props.navigation} />

            <Hr color="black" width={2} marginleft={25} marginright={25}>
                <Text style={styles.textWithDivider}>OR</Text>
            </Hr>

            <TouchableOpacity
              style={styles.registerWithEmail}
              onPress={
                    () => registerWithEmail()
                }
            > 
              <View style={styles.EmailContentContainer}>
                <View style={styles.EmailIcon}>
                  <View>
                    <Image style={{width: 30, height: 30}}
                      source={require('../../assets/icons/3_email_icon.png')}
                    />
                  </View>
                </View>
                <View style={styles.EmailTitle}>
                  <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                    Register with Email
                  </Text>
                </View>
              </View>
           
            </TouchableOpacity>
                
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    registerWithEmail: {
        height: 50,
        backgroundColor: StyleConstants.RegisterWithEmailBColor,
        justifyContent: 'center',
        borderRadius: 100,
        alignItems: 'center',
        borderColor: '#a8a8a8',
        marginHorizontal: 25
    },
    textWithDivider: {
        color: "black",
        marginVertical: 10,
        paddingHorizontal: 10
    },
    EmailContentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    EmailIcon: {
        paddingLeft: 15,
        justifyContent: 'center',
    },
    EmailTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 35
    }
    
};

export default (SelectRegisteration);
