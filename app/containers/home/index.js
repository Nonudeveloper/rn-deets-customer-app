// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeScreen from './HomeScreen';

import * as homeActions from '../../redux/home/homeActions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(homeActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

