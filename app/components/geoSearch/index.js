// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GeoCodeSearch from './GeoCodeSearch';

import * as geoActions from '../../redux/geoCoding/geoActions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(geoActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        features: state.Geo.features
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GeoCodeSearch);

