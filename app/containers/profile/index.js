// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DetailsScreen from './Details';
import ProfileScreen from './ProfileScreen';
import SampleEasing from './SampleEasing';
import { fetchVehicles } from '../../redux/register/startActions';
import * as profileActions from '../../redux/profile/actions';
import { logout } from '../../redux/auth/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(profileActions, dispatch),
        getVehicles: () => {
            dispatch(fetchVehicles());
        },
        logout: () => {
            dispatch(logout());
        }
    };
};

const mapStateToProps = (state) => {
    return {
        authUser: state.Profile.authUser,
        isFetching: state.Profile.isFetching,
        form: state.form,
        errorMessage: state.Profile.errorMessage,
        vehicleDeleteMessage: state.Profile.vehicleDeleteMessage,
        logoutMessage: state.Auth.errorMessage,
        authVehiclesData: state.Profile.authVehiclesData,
        vehicleData: state.Start.vehicles,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

