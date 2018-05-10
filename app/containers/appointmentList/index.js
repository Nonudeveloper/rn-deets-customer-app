// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppointmentList from './appointmentList';
// import PastAppointmentsList from './pastAppointmentsList';
// import UpcomingAppointmentsList from './upcomingAppointmentList';

import * as appointmentListActions from '../../redux/appointmentList/upcoming/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(appointmentListActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        isFetching: state.Service.isFetching,
        pastAppointments: state.appointmentLists.pastAppointments
    };
};
// const mySpecialContainerCreator = connect(mapStateToProps, mapDispatchToProps);

// export const FirstConnectedComponent = mySpecialContainerCreator(PastAppointmentsList);
// export const SecondConnectedComponent = mySpecialContainerCreator(UpcomingAppointmentsList);
// const components = [PastAppointmentsList, UpcomingAppointmentsList];

// export default components.map(mySpecialContainerCreator);

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentList);

