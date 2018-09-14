import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView, Keyboard } from 'react-native';
import inside from 'turf-inside';
import within from 'turf-within';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import styles from './styles';
import GeoCodeSearch from '../../components/geoSearch/index';
// import polyGeoJSON from '../../../../assets/polygon.json';
// import Icon from 'react-native-vector-icons/FontAwesome';
import customMarkerGreen from '../../assets/icons/icon_location_pin_green.png';
import customMarkerRed from '../../assets/icons/icon_location_pin_red.png';
import Header from '../header/Header';
import Loader from '../../deetscomponents/Loader';
import TimeInterval from './TimeInterval';

//difine constants
// const mapMarkerIcon = (<Icon name="map-marker" size={50} color="purple" />);
const marker = require('../../assets/icons/map_p.png');
const recentLocationIcon = require('../../assets/icons/map_black.png');
const gpsIcon = require('../../assets/icons/4_GPS_icon.png');

const MAPBOX_API_KEY = 'pk.eyJ1Ijoic2hpdmFtMTYwMjkxIiwiYSI6ImNqZWZiN3k3bDJmZGkzM2xlbnFuM3J4YWMifQ.NesZbu4KaREG0LWPD5boRA';

const layerStyles = Mapbox.StyleSheet.create({
  polygon: {
    fillAntialias: true,
    fillColor: 'grey',
    // fillOutlineColor: 'red',
    fillOpacity: 0.5,
  },
});

Mapbox.setAccessToken('pk.eyJ1Ijoic2hpdmFtMTYwMjkxIiwiYSI6ImNqZWZiN3k3bDJmZGkzM2xlbnFuM3J4YWMifQ.NesZbu4KaREG0LWPD5boRA');

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coordinates: [11.254, 43.772],
      center: [-117.867176, 33.855565],
      loading: false,
      inputVal: '',
      shouldUpdateAddressString: true,
      zoomLevel: 9,
      polygonDrawnOnce: false,
      locationFromRecentScreen: {},
      calloutStyles: {
        calloutButtonColor: '#66cc00',
        borderColor: '#bfff80'
      },
      isCenterInsideThePolygonArea: false,
      polygonData: {
        "type": "FeatureCollection",
        "features": []
      },
      pointFeatures: {
        "type": "FeatureCollection",
        "features": []
      },
      customMarker: customMarkerGreen,
      timeInterval: 0,
      currentLocationCoordinates: []
    };

    this.onRegionDidChange = this.onRegionDidChange.bind(this);
    this.renderMarkers = this.renderMarkers.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.getLat = this.getLat.bind(this);
    this.getLng = this.getLng.bind(this);
    console.ignoredYellowBox = ['Warning:'];
  }

  setLocation() {
    Keyboard.dismiss();
    if (this.state.isCenterInsideThePolygonArea) {
      this.props.navigation.navigate('SelectVehicleScreen');
    } else {
      //call an api here
      // alert('Location must be inside the polygon');
      Alert.alert(
    
        // This is Alert Dialog Title
        '',
     
        // This is Alert Dialog Message. 
        'Our services are not available in your area, but we are actively recruiting experienced service providers in your area. We will notify you when Deets reaches your town.',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Button Pressed'), style: 'cancel' },
          { text: 'Send Request', onPress: () => this.props.saveUnservedArea(this.state.center) },
        ]
      );
    }
    return;
  }

  async onRegionDidChange() {
      const { locationFromRecentScreen } = this.state;
      // const location = navigation.getParam('location', {});
      if (Object.keys(locationFromRecentScreen).length === 0) {
        const center = await this._map.getCenter();
        const zoom = await this._map.getZoom();
        this.setState({ zoomLevel: zoom, center });
        this.props.getFullAddressReverseGeo({ center, mapboxApiKey: MAPBOX_API_KEY });
      } else {
        //trigger an action to update location in geo reducer
        // this.props.getFullAddressReverseGeo({ center: this.state.center, mapboxApiKey: MAPBOX_API_KEY });
        // this.props.fetchPolygonData(this.state.center);
        this.setState({
          locationFromRecentScreen: {}
        });
      }
  }

  async componentDidMount() {
    this.props.fetchPolygonData(this.state.center); //this parameter is of no use now need to change it
    this.props.fetchUpcomingAndPastAppointments();
    const { navigation } = this.props;
    await this.promisedSetState({
      locationFromRecentScreen: navigation.getParam('location', {})
    });
    const { locationFromRecentScreen } = this.state;
    if (Object.keys(locationFromRecentScreen).length > 0) {
      this.setState({
        center: [
          Number(locationFromRecentScreen.service_location_longitude),
          Number(locationFromRecentScreen.service_location_latitude)
        ],
        inputVal: locationFromRecentScreen.service_location_string,
        shouldUpdateAddressString: false
      }, () => {

      });
      setTimeout(
        function() {
            this.setState({ shouldUpdateAddressString: true });
        }
        .bind(this),
        2000
      );
    } else {
      this.getCurrentLocation();
      
      this.setState({
        inputVal: this.props.addressString,
        shouldUpdateAddressString: true
      });
    }
  }

  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;
        console.log('success', longitude, latitude);
        this.flyTo([longitude, latitude]);
        this.setState({
          currentLocationCoordinates: [longitude, latitude],
        });
    }, (error) => {
        alert(JSON.stringify(error));
    }, {
        timeout: 2000,
    });
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.addressString !== '' && 
        this.props.addressString !== nextProps.addressString && 
        this.state.shouldUpdateAddressString === true) {
        this.setState({
          inputVal: nextProps.addressString
        });
        // this.props.fetchPolygonData(this.state.center);
    }
    if (nextProps.polygonData.length) {
      await this.promisedSetState(
        {
          polygonData: {
            "type": "FeatureCollection",
            "features": nextProps.polygonData
          },
          pointFeatures: {
            "type": "FeatureCollection",
            "features": nextProps.pointFeatures
          },
        }
      );
      const point = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": this.state.center
            }
          }
        ]
      };
      
      if (within(point, this.state.polygonData).features.length) {
        this.setState({ 
          calloutStyles: {
            calloutButtonColor: '#66cc00',
            borderColor: '#bfff80'
          },
          isCenterInsideThePolygonArea: true,
          customMarker: customMarkerGreen,
        });
      } else {
        this.setState({ 
          calloutStyles: {
            calloutButtonColor: 'red',
            borderColor: '#ff4d4d'
          },
          isCenterInsideThePolygonArea: false,
          customMarker: customMarkerRed,
        });
      }
    }
  }
  

  onRegionIsChanging = () => console.log('onRegionIsChanging!')

  getLng() {
    const { center } = this.state;
    return center.length === 2
      ? `Lng: ${center[0]}`
      : 'Not available';
  }

  getLat() {
    const { center } = this.state;
    return center.length === 2
      ? `Lat: ${center[1]}`
      : 'Not available';
  }

  promisedSetState = (newState) => new Promise((resolve) => {
        this.setState(newState, () => {
            resolve();
        });
    })

  async flyTo(coordinates) {
    await this._map.flyTo(coordinates, 1000);
  }

  addOnMapChangedListener = () => console.log('addOnMapChangedListener!')

  get markers() {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-118.012, 33.8464]
          }
        },
      ]
    };
  }

  renderPolygon(polyGeoJSON) {
    return (
      <Mapbox.ShapeSource id='polyGeoJSON' shape={polyGeoJSON}>
        <Mapbox.FillLayer id='polygonFill' style={layerStyles.polygon} />
      </Mapbox.ShapeSource>
    );
  }

  renderMarkers(pointFeatures) {
    return (
      <Mapbox.ShapeSource id="markerSource" shape={pointFeatures}>
        <Mapbox.SymbolLayer id="markerStyleLayer" style={{ iconImage: marker, iconIgnorePlacement: true, iconTextFit: 'height' }} />
      </Mapbox.ShapeSource>
    );
  }

  renderLabels(pointFeatures) {
    return (
      <Mapbox.ShapeSource id="label" shape={pointFeatures}>
        <Mapbox.SymbolLayer id="labelStyleLayer" style={{ textField: '{title}', textSize: 12, textColor: '#fff', textIgnorePlacement: true, textOffset: [0, 2], textHaloColor: 'grey', textHaloWidth: 4 }} />
      </Mapbox.ShapeSource>
    );
  }

  onChangeSearchText = (val) => {
    this.setState({
      inputVal: val
    });
  }

  navigateToAppointmentsList = () => {
    this.props.navigation.navigate('PastAppointmentsList');
  }

  goToRunningAppointments = () => {
    this.props.navigation.navigate('RunningAppointments', { timeInterval: this.state.timeInterval });
  }

  updatedInterval = (interval) => {
    this.setState({ timeInterval: interval });
  }

  onPress() {
    Keyboard.dismiss();
  }


  render() {
    const { isLoading } = this.props;
    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
            <Loader
                loading={isLoading}
            />
            <Mapbox.MapView
              styleURL={Mapbox.StyleURL.Street}
              centerCoordinate={this.state.center}
              onRegionDidChange={this.onRegionDidChange}
              zoomLevel={this.state.zoomLevel}
              zoomEnabled
              rotateEnabled
              pitchEnabled
              scrollEnabled
              ref={(c) => this._map = c}
              onPress={this.onPress}
              style={styles.map}
            >
              {this.renderPolygon(this.state.polygonData)}
              {/* {this.renderMarkers(this.state.pointFeatures)} */}
              {this.renderLabels(this.state.pointFeatures)}
            </Mapbox.MapView>

            <Header
              headerText={'Deets'}
              navigation={this.props.navigation}
              buttonType={'burger'}
              titleType={'logo'}
              showRightIcon
              rightIconType={'image'}
              rightImageSource={recentLocationIcon}
              onPress={() => this.props.navigation.navigate('RecentLocations')}
            />
            <GeoCodeSearch
              onAddressGet={(address) => {
                this.flyTo(address.geometry.coordinates);
                // this.setState({ center: address.geometry.coordinates });
              }}
              inputVal={this.state.inputVal}
              onChangeSearchText={(val) => this.onChangeSearchText(val)}
            />
            <View 
              style={[styles.calloutWraper, {
                backgroundColor: this.state.calloutStyles.calloutButtonColor,
                borderColor: this.state.calloutStyles.borderColor 
              }]}
            >
              <TouchableOpacity onPress={this.setLocation}>
                <Text style={{ color: '#fff', fontSize: 12 }}>{this.state.loading === false ? 'Set Location' : 'Loading...'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.customMarker}>
              <Image
                source={this.state.customMarker}
                style={{ width: 32, height: 40 }}
              />
            </View>
            <TouchableOpacity style={styles.gpsIconContainer} onPress={() => this.getCurrentLocation()}>
              <Image style={styles.gpsIcon} source={gpsIcon} />
            </TouchableOpacity>
            { this.props.currentRunningAppointments !== undefined && this.props.currentRunningAppointments.length !== 0 &&
              <TouchableOpacity style={styles.timeIntervalWrapper} onPress={() => this.goToRunningAppointments()}>
                <View style={styles.timeIntervalStaticTextContainer}>
                  <Text style={{ fontSize: 18 }}>SERVICE IN PROGRESS :</Text>
                </View>
                <TimeInterval 
                  onRef={ref => (this.timeInterval = ref)}
                  currentRunningAppointments={this.props.currentRunningAppointments[0]}
                  updatedInterval={this.updatedInterval}
                  initialTimeInterval={0}
                />
              </TouchableOpacity>
            }
            <TouchableOpacity style={styles.myAppointments} onPress={this.navigateToAppointmentsList}>
              <Text style={styles.myAppointmentsText}>My Appointments</Text>
            </TouchableOpacity>
        </ScrollView>
    );
  }
}
