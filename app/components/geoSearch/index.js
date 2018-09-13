// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import GeoCodeSearch from './GeoCodeSearch';


import * as geoActions from '../../redux/geoCoding/geoActions';


const mapDispatchToProps = (dispatch) => ({
        actions: bindActionCreators(geoActions, dispatch),
        // searchAddress: data => {
        //     dispatch(geoActions.searchAddress(data));
        // }
        searchAddress: _.throttle(data => dispatch(geoActions.searchAddress(data)), 1000)
        // searchAddress: _.debounce(data => dispatch(geoActions.searchAddress(data)), 2000)
        //https://jsbin.com/liwafuvupu/edit?js,output
    });

const mapStateToProps = (state) => ({
        features: state.Geo.features
    });

export default connect(mapStateToProps, mapDispatchToProps)(GeoCodeSearch);

