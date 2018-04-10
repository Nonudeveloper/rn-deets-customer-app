// @flow
// Container for Register Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VehicleInformation from './SelectVehicleScreen';


const mapDispatchToProps = (dispatch) => {
    return {

    };
};

const mapStateToProps = (state) => {
    return {
        userVehicle: state.Auth.vehicle
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleInformation);

