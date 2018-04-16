// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NotesScreen from './NotesScreen';

import * as serviceActions from '../../../redux/service/serviceActions';


const mapDispatchToProps = (dispatch) => {
    return {
        // actions: bindActionCreators(serviceActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesScreen);

