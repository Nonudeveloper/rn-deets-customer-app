// @flow
// Container for Register Component
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import StartScreen from './StartScreen';
import { fetchVehicles } from '../../redux/register/startActions';


const mapDispatchToProps = (dispatch) => {
    return {
        // actions: bindActionCreators(registerActions, dispatch),
        getVehicles: () => {
            dispatch(fetchVehicles());
        }
    };
};

const mapStateToProps = (state) => {
    return {
        isFetching: state.Start.isFetching
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);

