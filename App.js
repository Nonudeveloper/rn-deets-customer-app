import React from 'react';
import Instabug from 'instabug-reactnative';
import { Provider } from 'react-redux';
import configureStore from './app/store/index';
import StartScreen from './app/containers/start/StartScreen';
import ReduxNavigation from './app/navigation/ReduxNavigation';

const store = configureStore();

export default class App extends React.Component {
    constructor() {
        super();
        Instabug.startWithToken('dda9da27cd350702efec4ebefd63f507', Instabug.invocationEvent.shake);

        this.state = {
            signedIn: false,
            checkedSignIn: false
        };
    }

    componentWillMount() {
        
    }
    
    render() {
        return ( 
            < Provider store={store} >
                 <ReduxNavigation />
            </Provider>
        );
    }
}
