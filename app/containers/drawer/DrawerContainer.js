import React from 'react';
import { Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { onSignOut } from '../../helpers/utility';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import PaymentDetails from '../payments/index';
import Instabug from 'instabug-reactnative';


const userPic = require('../../assets/icons/3_user_img.png');
const deetsLogo = require('../../assets/icons/4_deets_logo.png');
// let SideMenuWidth = 300;


export default class DrawerContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      activeItemKey: 'HomeComponent'
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items[0].routes.length) {
      this.findActiveItem();
    }
  }

  setModalVisible = (visible) => {
    this.props.navigation.navigate('DrawerClose');
    this.setState({ modalVisible: visible });
  }

  findActiveItem() {
    const route = this.props.items[0].routes;
    const activeItem = route[route.length - 1];
    this.setState({ activeItemKey: activeItem.routeName });
  }

  invokeInstabugFeedbackMode = () => {
    this.props.navigation.navigate('DrawerClose');
    Instabug.invokeWithInvocationMode(Instabug.invocationMode.newFeedback);
  }

  invokeInstabug = () => {
    this.props.navigation.navigate('DrawerClose');
    Instabug.invoke();
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
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.3, y: 1.0 }}
        locations={[0.1, 0.85, 1]}
        colors={['#AEACA7', '#8AA9B3', '#646464']}
        style={styles.container}
      >
        <View style={styles.sideMenu}>
          <View style={{ backgroundColor: '#4CAF50', alignItems: 'center', marginBottom: 30 }}>
            <Image source={deetsLogo} style={{ resizeMode: 'contain', height: 40, width: 100 }} />
          </View>
          <View style={{}}>
            <TouchableOpacity
              style={[styles.menu, this.state.activeItemKey === 'detailsScreen' || this.state.activeItemKey === 'addVehicleScreen'
                ? { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 5 } : { backgroundColor: 'transparent' }]}
              onPress={() => navigation.navigate('detailsScreen')}
            >
              <Text style={styles.menuText} type='h5White'>Profile</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={[styles.menu, this.state.activeItemKey === 'PastAppointmentsList' || this.state.activeItemKey === 'PastAppointmentsDetail'
                ? { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 5 } : { backgroundColor: 'transparent' }]}
              onPress={() => navigation.navigate('PastAppointmentsList')}
            >
              <Text style={styles.menuText} type='h5White'>Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.menu, this.state.activeItemKey === 'PromotionCodeScreen'
                ? { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 5 } : { backgroundColor: 'transparent' }]}
              onPress={() => navigation.navigate('PromotionCodeScreen')}
            >
              <Text style={styles.menuText} type='h5White'>Promotion Code</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.menu, this.state.activeItemKey === 'DrawerServicesList'
                ? { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 5 } : { backgroundColor: 'transparent' }]}
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
              onPress={this.invokeInstabugFeedbackMode}
            >
              <Text style={styles.menuText} type='h5White'>Feedback</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menu}
              onPress={this.invokeInstabug}
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
