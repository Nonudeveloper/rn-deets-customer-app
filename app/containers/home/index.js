// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeScreen from './HomeScreen';

import * as homeActions from '../../redux/home/homeActions';
import { getFullAddressReverseGeo } from '../../redux/geoCoding/geoActions';

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(homeActions, dispatch),
        getFullAddressReverseGeo: (data) => {
            dispatch(getFullAddressReverseGeo(data));
        },
   
    };
};

const mapStateToProps = (state) => {
    return {
        addressString: state.Geo.addressString,
        isLoading: state.Geo.isFetching
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

