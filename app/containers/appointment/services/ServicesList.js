import React from 'react';
import { Animated, Easing, Image, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import ServiceContantsList from './ServiceContantsList';
import styles from './styles';

const carImage = require('../../../assets/icons/3_car_img.png');
const downArrow = require('../../../assets/icons/down_arrow.png');
const upArrow = require('../../../assets/icons/down_arrow_onclick.png');

const SUBCATEGORY_FADE_TIME = 100;
const SUBCATEGORY_HEIGHT = 67;

export default class ServiceList extends React.Component { 
    constructor(props) {
        super(props);
    
        this.state = {
            active: 0,
            showServices: true,
            maxheight: 0,
            toutSubcategoriesVisible: false,
        };
      }

    componentWillMount() {
      if (this.props.reSchedule !== '') {
          if (this.props.item.service_id === this.props.reSchedule.appointment.service_id) {
            this.toggleState();
          }
      }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeSection !== nextProps.servicePanelIndex) {
            this.hidePanelSubcatgories();
        }
    }

    setCollapsePanelRef = node => {
      if (node) {
        this.collapsePanelRef = node;
      }
    }

    animatedValue = new Animated.Value(0)
    animCategoryHeight = () => 
    this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.state.maxheight * SUBCATEGORY_HEIGHT],
    })
  
    measurements = {}
  
    measureCollapsePanelRef = () => {
      this.collapsePanelRef.measure((x, y, width, height, pageX, pageY) => {
        this.measurements.pageY = pageY;
        this.measurements.height = height;
        // this.props.handleLayout(this.measurements, this.props.servicePanelIndex);
      });
    }
  
    handlePressTout = () => {
      if (this.props.addons && this.props.addons.length) {
        const toutSubcategoriesVisible = this.state.toutSubcategoriesVisible;
        if (this.props.activeSection === this.props.servicePanelIndex) {
          if (toutSubcategoriesVisible) {
            this.hidePanelSubcatgories();
          } else {
            this.showPanelSubcatgories();
            this.props.reSchedule !== '' ? (this.props.item.service_id === this.props.reSchedule.appointment.service_id ? this.showAddons() : this.showServices()) : this.showServices();
            // this.showServices();
          }
        } else {
          this.hidePanelSubcatgories();
        }
      }
    }
  
    showPanelSubcatgories = (pageY) => {
      this.setState({ toutSubcategoriesVisible: true });
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: SUBCATEGORY_FADE_TIME,
        easing: Easing.inOut(Easing.quad),
      }).start(() => {
        // this.props.handlePressTout(this.props.servicePanelIndex);
      });
    }
  
    hidePanelSubcatgories = (pageY) => {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: SUBCATEGORY_FADE_TIME,
        easing: Easing.inOut(Easing.quad),
      }).start(() => {
        this.setState({ toutSubcategoriesVisible: false });
      });
    }
  
    myColor = position => {
        if (this.state.active === position) {
            return '#8ac10b';
          }
          return 'grey';
      }
    
      showServices = () => {
        this.setState({
            showServices: true,
            maxheight: this.props.item.included_adds_on.length
        });
        this.toggle(0);
      }
    
      showAddons = () => {
          this.setState({
            showServices: false,
            maxheight: this.props.item.excluded_adds_on.length
          });
        this.toggle(1);
      }
    
      toggle = (position) => {
        this.setState({ active: position });
      }

      toggleState() {
        this.props.toggleActiveState(this.props.servicePanelIndex, this.props.item);
        setTimeout(() => {
          this.handlePressTout();
        }, 0.01);
      }
  
    render() {
      let serviceContantsList;
      if (this.props.addons && this.props.addons.length) {
        serviceContantsList = (
          <Animated.View
            style={{ height: this.animCategoryHeight() }}
          >
            <ServiceContantsList
              {...this.props}
              showServices={this.state.showServices} 
              isVisible={this.state.toutSubcategoriesVisible} 
            />
          </Animated.View>
        );
      } else {
        serviceContantsList = null;
      }

      const { item } = this.props;
      return (
        <View
          style={this.props.servicePanelIndex === 0 ? { marginTop: 0 } : { marginTop: 5 }}
          onLayout={!this.measurements.pageY ? this.measureCollapsePanelRef : () => null}
        >
            <View style={styles.serviceItemContainer}>
              <TouchableOpacity activeOpacity={1} onPress={() => this.toggleState()}>
                  <View style={styles.serviceContainer}>
                      <View>
                          <Image style={styles.carImage} source={item.image ? { uri: item.image } : carImage} />
                      </View>
                      <View style={styles.serviceInfoContainer}>
                          <View style={styles.serviceNameContainer}>
                              <View style={styles.serviceName}>
                                  <Text style={styles.serviceNameText}>{item.service_name}</Text>
                              </View>
                              <View style={styles.servicePrice}>
                                <Text style={styles.servicePriceText}>${this.props.selectedVehicle.vehicle_type === 2 ? item.service_Large_cost : item.cost}</Text>
                              </View>
                          </View>
                          <View style={styles.descContainer}>
                              <View style={{ marginHorizontal: 5 }}>
                                  <Text style={[styles.descText, { color: '#000' }]}>Estimated Time: {item.estimation_time}</Text>
                                  <Text numberOfLines={3} style={[styles.descText, { color: 'grey' }]}>{item.details}</Text>
                              </View>
                          </View>
                      </View>
                  </View>
              </TouchableOpacity>
              <View style={styles.detailInfoContainer}>
                  <TouchableHighlight ref={this.setCollapsePanelRef} onPress={this.showServices.bind(this)} underlayColor={'transparent'}>
                      <View style={styles.dropItem}>
                          <Text style={{ color: this.myColor(this.state.toutSubcategoriesVisible ? 0 : '') }}>INCLUDED SERVICES</Text>
                          <Image style={styles.downArrow} source={this.state.toutSubcategoriesVisible ? (this.state.showServices ? upArrow : downArrow) : downArrow} />
                      </View>
                  </TouchableHighlight>
                  <TouchableHighlight ref={this.setCollapsePanelRef} onPress={this.showAddons.bind(this)} underlayColor={'transparent'}>
                      <View style={styles.dropItem}>
                          <Text style={{ color: this.myColor(this.state.toutSubcategoriesVisible ? 1 : '') }}>ADD-ON SERVICES</Text>
                          <Image style={styles.downArrow} source={this.state.toutSubcategoriesVisible ? (this.state.showServices ? downArrow : upArrow) : downArrow} />
                      </View>
                  </TouchableHighlight>
              </View>
          </View>
          {serviceContantsList}
        </View>
      );
    }
  }
