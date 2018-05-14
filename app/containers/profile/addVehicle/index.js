// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddVehicleScreen from './AddVehicleScreen';
import * as profileActions from '../../../redux/profile/actions';
import { fetchVehicles } from '../../../redux/register/startActions';
import { fetchMakeModel, updateModels, storeVehicleImage } from '../../../redux/register/vehicleInformation/vehicleActions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(profileActions, dispatch),
        getVehicles: () => {
            dispatch(fetchVehicles());
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
        errorMessageForVehicle: state.Profile.errorMessageForVehicle
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVehicleScreen);
