// @flow
// Container for Register Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthVehicleInformation from './SelectVehicleScreen';
import { fetchAuthVehicles } from '../../../redux/appointment/vehicle/vehicleActions';
import { setBackToInitialState } from '../../../redux/register/vehicleInformation/vehicleActions';

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAuthVehicles: () => {
            dispatch(fetchAuthVehicles());
        },
        setBackToInitialState: () => {
            dispatch(setBackToInitialState());
        },
    };
};

const mapStateToProps = (state) => {
    return {
        userVehicle: state.AuthVehicle.vehicles,
        isFetching: state.AuthVehicle.isFetching
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthVehicleInformation);

