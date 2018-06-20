import { AppRegistry } from 'react-native';
import App from './App';

if (process.env.NODE_ENV === 'development') {
	const _XHR = GLOBAL.originalXMLHttpRequest ?  
    GLOBAL.originalXMLHttpRequest :           
    GLOBAL.XMLHttpRequest;   
    global.FormData = global.originalFormData ?
    global.originalFormData :
    global.FormData;                  
	XMLHttpRequest = _XHR;
}

AppRegistry.registerComponent('deetscp', () => App);
export default App;
