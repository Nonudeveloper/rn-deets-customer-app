import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
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
      center: [-122.43475910000001, 37.7620333],
      loading: false,
      renderPolygon: false
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
    this.props.actions.fetchNearByPlaces(center);
    await this.setState({ renderPolygon: true, loading: false });
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
            "coordinates": [this.props.nearByPlaces]
          }
        }
      ]
    };
    return (
        <View style={styles.container}>
            <Mapbox.MapView
              styleURL={Mapbox.StyleURL.Street}
              centerCoordinate={this.state.coordinates}
              onDidFinishRenderingFrameFully={this.onDidFinishRenderingFrameFully}
              // onWillStartLoadingMap={() => {
              //   console.log('region will change...');
              // }}
              onRegionWillChange={this.onRegionWillChange}
              onRegionDidChange={this.onRegionDidChange}
              onDidFinishLoadingMap={this.onDidFinishLoadingMap}
              zoomLevel={13}
              ref={(c) => this._map = c}
              onPress={this.onPress}
              style={styles.map}
            > 
              
              <Mapbox.VectorSource>
                <Mapbox.BackgroundLayer id='background' />
              </Mapbox.VectorSource>
              {this.state.renderPolygon && this.renderPolygon(polyGeoJSON)}
            </Mapbox.MapView>
            <Header headerText={'Deets'} navigation={this.props.navigation} buttonType={'burger'} titleType={'logo'} />
            <GeoCodeSearch 
              onAddressGet={(address) => { 
                this.setState({ coordinates: address.geometry.coordinates });
              }} 
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
