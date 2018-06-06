import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import styles from './styles';
import GeoCodeSearch from '../../components/geoSearch/index';
// import polyGeoJSON from '../../../../assets/polygon.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import customMarker from '../../assets/icons/icon_location_pin_green.png';
// import gridPattern from '../../../../assets/grid_pattern.png';
import Header from '../header/Header';

//difine constants
// const mapMarkerIcon = (<Icon name="map-marker" size={50} color="purple" />);
const backButton = require('../../assets/icons/2_back_btn_onclick.png');
const recentLocationIcon = require('../../assets/icons/map.png');

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
      center: [11.254, 43.772],
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
    this.breakIt = 0; 
    const center = await this._map.getCenter();
    await this.setState({ loading: false, center });
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
    let isMyObjectEmpty = !Object.keys(location).length;
    if(!isMyObjectEmpty) {
      this.setState({
        center: [
          parseInt(location.service_location_longitude), 
          parseInt(location.service_location_latitude)
        ],
        inputVal: location.service_location_string
      });
    }
  }

  render() {
    

    let polyGeoJSON = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
    
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [[[-67.13734351262877, 45.137451890638886],
            [-66.96466, 44.8097],
            [-68.03252, 44.3252],
            [-69.06, 43.98],
            [-70.11617, 43.68405],
            [-70.64573401557249, 43.090083319667144],
            [-70.75102474636725, 43.08003225358635],
            [-70.79761105007827, 43.21973948828747],
            [-70.98176001655037, 43.36789581966826],
            [-70.94416541205806, 43.46633942318431],
            [-71.08482, 45.3052400000002],
            [-70.6600225491012, 45.46022288673396],
            [-70.30495378282376, 45.914794623389355],
            [-70.00014034695016, 46.69317088478567],
            [-69.23708614772835, 47.44777598732787],
            [-68.90478084987546, 47.184794623394396],
            [-68.23430497910454, 47.35462921812177],
            [-67.79035274928509, 47.066248887716995],
            [-67.79141211614706, 45.702585354182816],
            [-67.13734351262877, 45.137451890638886]]]
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
              zoomLevel={11}
              ref={(c) => this._map = c}
              onPress={this.onPress}
              style={styles.map}
            > 
              
              <Mapbox.VectorSource>
                <Mapbox.BackgroundLayer id='background' />
              </Mapbox.VectorSource>
              {this.state.renderPolygon && this.renderPolygon(polyGeoJSON)}
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
            />
            <View style={styles.calloutWraper}>
              <TouchableOpacity onPress={this.setLocation}><Text style={{ color: '#fff', fontSize: 12 }}>{this.state.loading === false ? 'Set Location' : 'Loading...'}</Text></TouchableOpacity>
            </View>
            <View style={styles.customMarker}>
              <Image
                source={customMarker}
                style={{ width: 32, height: 40 }}
              />
            </View>
        </View>
    );
  }
}
