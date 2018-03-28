import { Alert, AsyncStorage } from 'react-native';
import { verifyEmailRequest } from '../../../redux/register/actions';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values, dispatch) => {
      AsyncStorage.removeItem('emailAvailability');
      dispatch(verifyEmailRequest(values));
       return sleep(3000) // simulate server latency
        .then(() => {
           const item = AsyncStorage.getItem('emailAvailability');
            //  item.then((val) => {
              //  const message = JSON.parse(val);
              //  if (message && message.flag === 6) {
              //      Alert.alert(
              //       'Error',
              //       'Email already exists!',
              //       [
              //         { text: 'OK', onPress: () => console.log('OK Pressed') },
              //       ],
              //     );
              // }
            // });
        });
};


export default asyncValidate;
