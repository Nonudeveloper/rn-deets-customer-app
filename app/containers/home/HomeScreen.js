import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import inside from 'turf-inside';
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
      renderPolygon: true,
      inputVal: '',
      shouldUpdateAddressString: true,
      zoomLevel: 14,
      polygonData: {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
  
            },
            "geometry": {
              "type": "Polygon",
              "coordinates": []
            },
  
          }
        ],
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
        }
      },
      markerPoint: {
        "type": "Feature",
        "properties": {
          "marker-color": "#f00"
        },
        "geometry": {
          "type": "Point",
          "coordinates": []
        }
      }
    };

    this.onRegionDidChange = this.onRegionDidChange.bind(this);
    // this.onDidFinishLoadingMap = this.onDidFinishLoadingMap.bind(this);
    
    this.setLocation = this.setLocation.bind(this);
    this.getLat = this.getLat.bind(this);
    this.getLng = this.getLng.bind(this);
    this.breakIt = 0;
  }

  // async onDidFinishLoadingMap() {
  //   await this.setState({ loading: false });
  // }

  // onRegionWillChange = () => {
  //   this.setState({ loading: true });
  // }

  async onRegionDidChange() {
    const center = await this._map.getCenter();
    const zoom = await this._map.getZoom();
    this.setState({ zoomLevel: zoom });
    
    this.props.getFullAddressReverseGeo({ center, mapboxApiKey: MAPBOX_API_KEY });
    await this.setState({ loading: false, center });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addressString !== '' && 
        this.props.addressString !== nextProps.addressString && 
        this.state.shouldUpdateAddressString === true) {
      this.setState({
        inputVal: nextProps.addressString
      });
      this.props.fetchPolygonData(nextProps.addressString);
    }
    this.setState({
      polygonData: {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
  
            },
            "geometry": {
              "type": "Polygon",
              "coordinates": [nextProps.polygonData]
            },
  
          }
        ],
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
        }
      }
    });
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

  async setLocation() {
    const center = await this._map.getCenter();
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
        inputVal: location.service_location_string,
        shouldUpdateAddressString: false
      }, () => {
      });
    } else {
      this.setState({
        inputVal: this.props.addressString,
        shouldUpdateAddressString: true
      });
    }
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
    const { isLoading } = this.props;
    return (
        <View style={styles.container}>
            <Loader
                loading={isLoading}
            />
            <Mapbox.MapView
              styleURL={Mapbox.StyleURL.Street}
              centerCoordinate={this.state.center}
              onDidFinishRenderingFrameFully={this.onDidFinishRenderingFrameFully}
              onRegionWillChange={this.onRegionWillChange}
              onRegionDidChange={this.onRegionDidChange}
              onDidFinishLoadingMap={this.onDidFinishLoadingMap}
              onWillStartRenderingMap={this.onWillStartRenderingMap}
              zoomLevel={this.state.zoomLevel}
              zoomEnabled
              ref={(c) => this._map = c}
              onPress={this.onPress}
              style={styles.map}
            >

              {/* <Mapbox.VectorSource>
                <Mapbox.BackgroundLayer id='background' />
              </Mapbox.VectorSource> */}
              {this.renderPolygon(this.state.polygonData)}
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
            <TouchableOpacity style={styles.myAppointments} onPress={this.navigateToAppointmentsList}>
              <Text style={styles.myAppointmentsText}>My Appointments</Text>
            </TouchableOpacity>
        </View>
    );
  }
}
