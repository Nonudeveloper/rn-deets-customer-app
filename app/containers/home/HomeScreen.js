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
    fillColor: 'rgba(255, 255, 255, 0.1)',
    fillOutlineColor: 'rgba(255, 255, 255, 0.84)',
    fillExtrusionOpacity: 8,
  },
});

Mapbox.setAccessToken('pk.eyJ1Ijoic2hpdmFtMTYwMjkxIiwiYSI6ImNqZWZiN3k3bDJmZGkzM2xlbnFuM3J4YWMifQ.NesZbu4KaREG0LWPD5boRA');

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coordinates: [11.254, 43.772],
      center: [-119.645883, 36.678122],
      loading: false,
      renderPolygon: true,
      inputVal: '',
      shouldUpdateAddressString: true,
      zoomLevel: 11,
      polygonDrawnOnce: false,
      polygonData: {
        'type': 'Feature',
        'geometry': {
            'type': 'Polygon',
            'coordinates': []
        }
      },
      turfPolygon: {},
      
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

  async onRegionDidChange() {
    const center = await this._map.getCenter();
    const zoom = await this._map.getZoom();
    this.setState({ zoomLevel: zoom });
    this.props.getFullAddressReverseGeo({ center, mapboxApiKey: MAPBOX_API_KEY });
    const centerPoint = {
      "type": "Feature",
      "properties": {
        "marker-color": "#f00"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-112.074279, 40.853293]
      }
    };
    console.log(centerPoint);
    console.log(this.state.turfPolygon);
    if (this.state.polygonDrawnOnce) {
      const isInside = inside(centerPoint, this.state.turfPolygon);
      console.log(isInside);
      const p1 = { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [ [ [ -87.656985, 41.951084 ], [ -87.656858, 41.951086 ], [ -87.656806, 41.951087 ], [ -87.656704, 41.951088 ], [ -87.656661, 41.951088 ], [ -87.656535, 41.951091 ], [ -87.656494, 41.951092 ], [ -87.656325, 41.951094 ], [ -87.656245, 41.951096 ], [ -87.655821, 41.951102 ], [ -87.655653, 41.951105 ], [ -87.655411, 41.951109 ], [ -87.655059, 41.951115 ], [ -87.654685, 41.95112 ], [ -87.654444, 41.951124 ], [ -87.654431, 41.950707 ], [ -87.654395, 41.949459 ], [ -87.654384, 41.949043 ], [ -87.654373, 41.948683 ], [ -87.654344, 41.947698 ], [ -87.654341, 41.947604 ], [ -87.65433, 41.947245 ], [ -87.654576, 41.94724 ], [ -87.654938, 41.947234 ], [ -87.655317, 41.947228 ], [ -87.655565, 41.947225 ], [ -87.655755, 41.947221 ], [ -87.656313, 41.947213 ], [ -87.656325, 41.947212 ], [ -87.656516, 41.947202 ], [ -87.656663, 41.947194 ], [ -87.656849, 41.947184 ], [ -87.657104, 41.94718 ], [ -87.657252, 41.947178 ], [ -87.657382, 41.947176 ], [ -87.657635, 41.947171 ], [ -87.657739, 41.94717 ], [ -87.658784, 41.947154 ], [ -87.659168, 41.947149 ], [ -87.659165, 41.947254 ], [ -87.659167, 41.94733 ], [ -87.659176, 41.947623 ], [ -87.659181, 41.947876 ], [ -87.659186, 41.948059 ], [ -87.65919, 41.94824 ], [ -87.659196, 41.948487 ], [ -87.659204, 41.948785 ], [ -87.65921, 41.948967 ], [ -87.659219, 41.949292 ], [ -87.659229, 41.949598 ], [ -87.659245, 41.950269 ], [ -87.659254, 41.950595 ], [ -87.659257, 41.950685 ], [ -87.659266, 41.950957 ], [ -87.659269, 41.951048 ], [ -87.658928, 41.951052 ], [ -87.657908, 41.951068 ], [ -87.657569, 41.951074 ], [ -87.657468, 41.951075 ], [ -87.657167, 41.951081 ], [ -87.657067, 41.951083 ], [ -87.657014, 41.951083 ], [ -87.656985, 41.951084 ] ] ] } };
      const p2 = {"type": "Feature", "properties": {}, "geometry": {"type": "Point", "coordinates": [-87.655889, 41.947783]}};
      console.log(inside(p2, p1));
    } 
  }

  checkIfInside() {
    console.log(this.state.turfPolygon);
    const isInside = inside(this.state.pt1, this.state.turfPolygon);
    console.log(isInside);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addressString !== '' && 
        this.props.addressString !== nextProps.addressString && 
        this.state.shouldUpdateAddressString === true) {
      this.setState({
        inputVal: nextProps.addressString
      });
      if (!this.state.polygonDrawnOnce) this.props.fetchPolygonData(nextProps.addressString);
      this.setState({
        polygonDrawnOnce: true
      });
    }
    if (nextProps.polygonData.length) {
      console.log(nextProps.polygonData);
      this.setState({
        polygonData: {
          'type': 'Feature',
          'geometry': {
              'type': 'Polygon',
              'coordinates': [nextProps.polygonData]
          }
        },
        turfPolygon: {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Polygon",
            "coordinates": [[
              [-112.074279, 40.52215],
              [-112.074279, 40.853293],
              [-111.610107, 40.853293],
              [-111.610107, 40.52215],
              [-112.074279, 40.52215]
            ]]
          }
        }
      });
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

  setLocation() {
    this.checkIfInside();
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
