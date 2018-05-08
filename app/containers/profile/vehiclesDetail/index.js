// @flow
// Container for Register Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchVehicles } from '../../../redux/register/startActions';
import * as profileActions from '../../../redux/profile/actions';
import VehiclesScreen from './vehiclesScreen';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(profileActions, dispatch),
        getVehicles: () => {
            dispatch(fetchVehicles());
        }
    };
};

const mapStateToProps = (state) => {
    return {
        vehicleData: state.Start.vehicles,
        isFetching: state.Vehicle.isFetching,
        authVehiclesData: state.Profile.authVehiclesData,
        errorMessage: state.Profile.errorMessage,
        fetchMakeModel: state.Profile.fetchMakeModel
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesScreen);
