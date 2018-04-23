// @flow
// Container for Register Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VehicleInformation from './VehicleInformation';
import * as registerActions from '../../../redux/register/actions';
import { fetchVehiclesFromAsyncStorage } from '../../../redux/register/startActions';
import { fetchMakeModel, updateModels, storeVehicleImage } from '../../../redux/register/vehicleInformation/vehicleActions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(registerActions, dispatch),
        fetchVehiclesFromAsyncStorage: () => {
            dispatch(fetchVehiclesFromAsyncStorage());
        },
        fetchMakeModel: (year) => {
            dispatch(fetchMakeModel(year));
        },
        updateModels: (models) => {
            dispatch(updateModels(models));
        },
        storeVehicleImage: (image) => {
            dispatch(storeVehicleImage(image));
        }
    };
};

const mapStateToProps = (state) => {
    return {
         vehicleData: state.Start.vehicles,
         isFetching: state.Vehicle.isFetching,
         makeModel: state.Vehicle.makeModelData,
         models: state.Vehicle.models,
         form: state.form.vehicleForm,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleInformation);

