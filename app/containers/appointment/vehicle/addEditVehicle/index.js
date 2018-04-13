// @flow
// Container for Register Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as registerActions from '../../../../redux/register/actions';
import AddEditVehicleInformation from './AddEditVehicle';
import { fetchMakeModel, updateModels  } from '../../../../redux/register/vehicleInformation/vehicleActions';
import { fetchVehicles } from '../../../../redux/register/startActions';
import * as authVehicleActions from '../../../../redux/appointment/vehicle/vehicleActions';

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authVehicleActions, dispatch),
        fetchMakeModel: (year) => {
            dispatch(fetchMakeModel(year));
        },
        updateModels: (models) => {
            dispatch(updateModels(models));
        },
        getVehicles: () => {
            dispatch(fetchVehicles());
        }
    };
};

const mapStateToProps = (state) => {
    return {
        vehicleData: state.Start.vehicles,
        isFetching: state.Vehicle.isFetching,
        makeModel: state.Vehicle.makeModelData,
        models: state.Vehicle.models,
        form: state.form.addEditVehicleForm,
        vehicleFetching: state.Start.isFetching,
        authUser: state.Auth.user,
        vehicleImage: state.AuthVehicle.vehicleImage,
        errorMessage: state.AuthVehicle.errorMessage
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditVehicleInformation);
