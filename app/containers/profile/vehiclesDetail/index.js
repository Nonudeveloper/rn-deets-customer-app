// // @flow
// // Container for Login Component
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import VehiclesScreen from './vehiclesScreen';

// import * as profileActions from '../../../redux/profile/actions';


// const mapDispatchToProps = (dispatch) => {
//     return {
//         actions: bindActionCreators(profileActions, dispatch),
//     };
// };

// const mapStateToProps = (state) => {
//     return {
//         // authUser: state.Profile.authUser,
//         // isFetching: state.Profile.isFetching,
//         // form: state.form,
//         // errorMessage: state.Profile.errorMessage,
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(VehiclesScreen);

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
        errorMessage: state.Profile.errorMessage
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesScreen);
