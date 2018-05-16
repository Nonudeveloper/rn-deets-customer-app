// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NotesScreen from './NotesScreen';

import * as appointmentActions from '../../../redux/appointment/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(appointmentActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesScreen);
