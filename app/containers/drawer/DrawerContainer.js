import React from 'react';
import { Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { onSignOut } from '../../helpers/utility';
import styles, { colors } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import PaymentDetails from '../payments/index';


const userPic = require('../../assets/icons/3_user_img.png');
const deetsLogo = require('../../assets/icons/4_deets_logo.png');
// let SideMenuWidth = 300;


export default class DrawerContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        modalVisible: false,
      };
  }
  // logout = () => {
  //   // This will reset back to loginStack
  //   // https://github.com/react-community/react-navigation/issues/1127
  //   const actionToDispatch = NavigationActions.reset({
  //     index: 0,
  //     key: null,  // black magic
  //     actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
  //   })
  //   console.log(this.props)
  //   this.props.navigation.dispatch(actionToDispatch)
  // }

  setModalVisible = (visible) => {
    this.props.navigation.navigate('DrawerClose');
    this.setState({ modalVisible: visible });
  }

  renderModal = () => {
    return (
      <Modal
        visible={this.state.modalVisible}
        transparent
        animationType={'none'}
        onRequestClose={() => console.log('hjk')}
      >
    <PaymentDetails setModalVisible={this.setModalVisible} navigation={this.props.navigation} />
    </Modal>
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0.1, 0.75, 1]}
        colors={['#fff', '#fff', '#fff']}
        style={styles.container}
      >
        <View style={styles.sideMenu}>
          <View style={{ backgroundColor: '#4CAF50', alignItems: 'center', marginBottom: 30 }}>
              <Image source={deetsLogo} style={{ resizeMode: 'contain', height: 40, width: 100 }} />
          </View>
          <View style={{}}>
            <TouchableOpacity
              style={styles.menu}
              onPress={() => navigation.navigate('detailsScreen')}
            >
                  <Text style={styles.menuText} type='h5White'>Profile</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.menu}
              onPress={() => navigation.navigate('PastAppointmentsList')}
            >
                  <Text style={styles.menuText} type='h5White'>Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menu}
              onPress={() => navigation.navigate('PromotionCodeScreen')}
            >
                  <Text style={styles.menuText} type='h5White'>Promotion Code</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menu}
              onPress={() => navigation.navigate('DrawerServicesList')}
            >
                  <Text style={styles.menuText} type='h5White'>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menu}
              onPress={() => this.setModalVisible(true)}
            >
                  <Text style={styles.menuText} type='h5White'>Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menu}
            >
                  <Text style={styles.menuText} type='h5White'>Feedback</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menu}
            >
                  <Text style={styles.menuText} type='h5White'>Contact us</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.menu}
            >
                  <Text style={styles.menuText} type='h5White'>Legal</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menu} onPress={() => onSignOut().then(() => navigation.navigate('loginStack'))} >
                  <Text style={styles.menuText} type='h5White'>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.renderModal()}
      </LinearGradient>
    );
  }
}
