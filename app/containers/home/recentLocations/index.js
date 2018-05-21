// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RecentLocationsScreen from './recentLocationsScreen';

import * as recentLocationActions from '../../../redux/home/recentLocations/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(recentLocationActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        isFetching: state.RecentLocations.isFetching,
        recentLocations: state.RecentLocations.recentLocations,
        errorMessage: state.RecentLocations.errorMessage
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentLocationsScreen);

