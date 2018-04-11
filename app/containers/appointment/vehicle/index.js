// @flow
// Container for Register Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthVehicleInformation from './SelectVehicleScreen';
import { fetchAuthVehicles } from '../../../redux/appointment/vehicle/vehicleActions';


const mapDispatchToProps = (dispatch) => {
    return {
        fetchAuthVehicles: () => {
            dispatch(fetchAuthVehicles());
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

