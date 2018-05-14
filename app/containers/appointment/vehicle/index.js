// @flow
// Container for Register Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthVehicleInformation from './SelectVehicleScreen';
import { fetchAuthVehicles, selectedVehicle } from '../../../redux/appointment/vehicle/vehicleActions';
import { setBackToInitialState } from '../../../redux/register/vehicleInformation/vehicleActions';
import { setSelectedAppointmentToInitialState } from '../../../redux/appointmentList/upcoming/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAuthVehicles: () => {
            dispatch(fetchAuthVehicles());
        },
        setBackToInitialState: () => {
            dispatch(setBackToInitialState());
        },
        selectedVehicle: (vehicle) => {
            dispatch(selectedVehicle(vehicle));
        },
        setSelectedAppointmentToInitialState: () => {
            dispatch(setSelectedAppointmentToInitialState());
        },
    };
};

const mapStateToProps = (state) => {
    return {
        userVehicle: state.AuthVehicle.vehicles,
        isFetching: state.AuthVehicle.isFetching,
        selectedAppointment: state.appointmentLists.selectedAppointment
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthVehicleInformation);

