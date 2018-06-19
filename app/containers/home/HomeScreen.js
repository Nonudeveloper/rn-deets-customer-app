import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import styles from './styles';
import GeoCodeSearch from '../../components/geoSearch/index';
// import polyGeoJSON from '../../../../assets/polygon.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import customMarker from '../../assets/icons/icon_location_pin_green.png';
import Header from '../header/Header';
import Loader from '../../deetscomponents/Loader';

//difine constants
// const mapMarkerIcon = (<Icon name="map-marker" size={50} color="purple" />);
const backButton = require('../../assets/icons/2_back_btn_onclick.png');
const recentLocationIcon = require('../../assets/icons/map_black.png');
const MAPBOX_API_KEY = 'pk.eyJ1Ijoic2hpdmFtMTYwMjkxIiwiYSI6ImNqZWZiN3k3bDJmZGkzM2xlbnFuM3J4YWMifQ.NesZbu4KaREG0LWPD5boRA';

const layerStyles = Mapbox.StyleSheet.create({
  smileyFace: {
    fillAntialias: true,
    fillColor: 'lightgrey',
    fillOutlineColor: 'grey',
  },
});

Mapbox.setAccessToken('pk.eyJ1Ijoic2hpdmFtMTYwMjkxIiwiYSI6ImNqZWZiN3k3bDJmZGkzM2xlbnFuM3J4YWMifQ.NesZbu4KaREG0LWPD5boRA');

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coordinates: [11.254, 43.772],
      center: [-122.44492709999997, 37.787544],
      loading: false,
      renderPolygon: false,
      inputVal: ''
    };

    this.onRegionDidChange = this.onRegionDidChange.bind(this);
    this.onDidFinishLoadingMap = this.onDidFinishLoadingMap.bind(this);

    this.setLocation = this.setLocation.bind(this);

    this.getLat = this.getLat.bind(this);
    this.getLng = this.getLng.bind(this);
    this.breakIt = 0;
    this.polyGeoJSON = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {

          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [this.props.nearByPlaces]
          }
        }
      ]
    };
  }

  async onDidFinishLoadingMap() {
    await this.setState({ loading: false });
  }

  onRegionWillChange = () => {
    this.setState({ loading: true });
  }

  async onRegionDidChange() {
    const center = await this._map.getCenter();
    console.log(center);
    this.props.getFullAddressReverseGeo({ center, mapboxApiKey: MAPBOX_API_KEY });
    await this.setState({ loading: false, center });
    if (this.props.addressString !== '' && this.props.addressString !== undefined) {
      this.setState({
        inputVal: this.props.addressString
      });
    }
    //all an action to get real polygon data
    // console.log(this.props.addressString);
    // this.props.fetchPolygonData(this.props.addressString);
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);
  //   if (nextProps.addressString !== '') this.props.fetchPolygonData(nextProps.addressString);
  // }

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

  async setLocation() {
    const center = await this._map.getCenter();
    //dispatch an action and get data for GeoJSON polygon
    // this.props.actions.fetchNearByPlaces(center);
    await this.setState({ renderPolygon: true, loading: false });
    this.props.navigation.navigate('SelectVehicleScreen');
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
            coordinates: this.state.center
          }
        }
      ]
    };
  }

  renderAnnotations() {
    return (
      <Mapbox.PointAnnotation
        key='pointAnnotation'
        id='pointAnnotation'
        coordinate={this.state.coordinates}
      >
        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
        <Mapbox.Callout title='Look! An annotation!' />
      </Mapbox.PointAnnotation>
    );
  }

  renderPolygon(polyGeoJSON) {
    return (
      <Mapbox.ShapeSource id='polyGeoJSON' shape={polyGeoJSON}>
        <Mapbox.FillLayer id='smileyFaceFill' style={layerStyles.smileyFace} />
      </Mapbox.ShapeSource>
    );
  }

  componentDidMount() {
    const { navigation } = this.props;
    const location = navigation.getParam('location', {});
    const isMyObjectEmpty = !Object.keys(location).length;
    if (!isMyObjectEmpty) {
      this.setState({
        center: [
          Number(location.service_location_longitude),
          Number(location.service_location_latitude)
        ],
        inputVal: location.service_location_string
      }, () => {
      });
    } else {
      this.setState({
        inputVal: 'San Francisco, CA, USA'
      });
    }

    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     this.setState({
    //       center: [
    //         position.coords.latitude,
    //         position.coords.longitude
    //       ]
    //     });
    //       console.log("Lat: " + position.coords.latitude + "\nLon: " + position.coords.longitude);
    //   },
    //   (error) => {
    //        console.log(error.message);
    //   }, {
    //        timeout: 5000
    //   }
    // );
  }

  onChangeSearchText = (val) => {
    this.setState({
      inputVal: val
    });
  }
  
  navigateToAppointmentsList = () => {
    this.props.navigation.navigate('PastAppointmentsList');
  }

  render() {
    console.log(this.props.polygonData);
    const { isLoading } = this.props;
    let polyGeoJSON = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {

          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [this.props.polygonData]
          },

        }
      ],
      'paint': {
          'fill-color': '#088',
          'fill-opacity': 0.8
      }
    };
    return (
        <View style={styles.container}>
            {/* <Loader
                loading={isLoading}
            /> */}
            <Mapbox.MapView
              styleURL={Mapbox.StyleURL.Street}
              centerCoordinate={this.state.center}
              onDidFinishRenderingFrameFully={this.onDidFinishRenderingFrameFully}
              // onWillStartLoadingMap={() => {
              //   console.log('region will change...');
              // }}
              onRegionWillChange={this.onRegionWillChange}
              onRegionDidChange={this.onRegionDidChange}
              onDidFinishLoadingMap={this.onDidFinishLoadingMap}
              zoomLevel={14}
              ref={(c) => this._map = c}
              onPress={this.onPress}
              style={styles.map}
            >

              {/* <Mapbox.VectorSource>
                <Mapbox.BackgroundLayer id='background' />
              </Mapbox.VectorSource> */}
              {this.renderPolygon(polyGeoJSON)}
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
                this.setState({ center: address.geometry.coordinates });
              }}
              inputVal={this.state.inputVal}
              onChangeSearchText={(val) => this.onChangeSearchText(val)}
            />
            <View style={styles.calloutWraper}>
              <TouchableOpacity onPress={this.setLocation}>
                <Text style={{ color: '#fff', fontSize: 12 }}>{this.state.loading === false ? 'Set Location' : 'Loading...'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.customMarker}>
              <Image
                source={customMarker}
                style={{ width: 32, height: 40 }}
              />
            </View>
            <TouchableOpacity style={styles.myAppoinments} onPress={this.navigateToAppointmentsList}>
              <Text style={styles.myAppoinmentsText}>My Appointments</Text>
            </TouchableOpacity>
        </View>
    );
  }
}
