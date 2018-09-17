// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReviewScreen from './ReviewScreen';

import * as appointmentActions from '../../../redux/appointment/actions';
import { fetchUpcomingAndPastAppointments } from '../../../redux/appointmentList/actions';
import { createBrainTreeClientToken } from '../../../redux/register/startActions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(appointmentActions, dispatch),
        fetchUpcomingAndPastAppointments: () => {
            dispatch(fetchUpcomingAndPastAppointments());
        },
        createBrainTreeClientToken: (customerId) => {
            dispatch(createBrainTreeClientToken(customerId));
        }
    };
};

const mapStateToProps = (state) => {
    return {
        selectedSchedule: state.Appointment.selectedSchedule,
        notes: state.form.notes,
        selectedServices: state.Service.selectedServices,
        userCardDetails: state.Appointment.userCardDetails,
        serviceAppointmentId: state.Service.serviceAppointmentId,
        selectedCardDetails: state.Appointment.selectedCardDetails,
        isFetching: state.Appointment.isFetching,
        appointmentScheduleMsg: state.Appointment.appointmentScheduleMsg,
        reSchedule: state.appointmentLists.selectedAppointment,
        addressString: state.Geo.addressString,
        geoLocationData: state.Geo.geoLocationData,
        clientToken: state.Start.clientToken,
        userDeatail: state.Profile.authUser,
        fetchingCardData: state.Appointment.fetchingCardData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewScreen);

