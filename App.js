import React from 'react';
import Instabug from 'instabug-reactnative';
import { Provider } from 'react-redux';
import configureStore from './app/store/index';
import StartScreen from './app/containers/start/StartScreen';
import ReduxNavigation from './app/navigation/ReduxNavigation';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-native';

const store = configureStore();

export default class App extends React.Component {
    constructor() {
        super();
        Instabug.startWithToken('dda9da27cd350702efec4ebefd63f507', Instabug.invocationEvent.shake);
        // Instabug.setCrashReportingEnabled(true);
        SplashScreen.hide();
        this.state = {
            signedIn: false,
            checkedSignIn: false
        };
    }

    componentWillMount() {
        
    }
    
    render() {
        return ( 
        <SafeAreaView style={{flex: 1, backgroundColor: '#f9f9f9'}}>
            <Provider store={store}>
                 <ReduxNavigation />
            </Provider>
        </SafeAreaView>
        );
    }
}
