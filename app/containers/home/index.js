// @flow
// Container for Login Component
import { connect } from 'react-redux';

import { bindActionCreators, compose } from 'redux';
import HomeScreen from './HomeScreen';

import * as homeActions from '../../redux/home/homeActions';
import { getFullAddressReverseGeo, updateLocationData } from '../../redux/geoCoding/geoActions';
import { fetchUpcomingAndPastAppointments } from '../../redux/appointmentList/actions';
import withConnectivity from '../../hoc/withConnectivity';

const mapDispatchToProps = (dispatch) => ({
        actions: bindActionCreators(homeActions, dispatch),
        getFullAddressReverseGeo: (data) => {
            dispatch(getFullAddressReverseGeo(data));
        },
        fetchPolygonData: data => {
            dispatch(homeActions.fetchPolygonData(data));
        },
        emptyPolygonData: () => {
            dispatch(homeActions.emptyPolygonData());
        },
        updateLocationData: (data) => {
            dispatch(updateLocationData(data));
        },
        fetchUpcomingAndPastAppointments: () => {
            dispatch(fetchUpcomingAndPastAppointments());
        },
        saveUnservedArea: (data) => {
            dispatch(homeActions.saveUnservedArea(data));
        }
    });

const mapStateToProps = (state) => ({
        addressString: state.Geo.addressString,
        isLoading: state.home.isFetching,
        polygonData: state.home.polygonData,
        pointFeatures: state.home.pointFeatures,
        currentRunningAppointments: state.Auth.authUserWholeData.current_running_appointments
    });

// export default connect(mapStateToProps, mapDispatchToProps)(withConnectivity(HomeScreen));

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withConnectivity
)(HomeScreen);
