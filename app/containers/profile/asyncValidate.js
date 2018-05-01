import { Alert, AsyncStorage } from 'react-native';
import { verifyEmailRequest } from '../../redux/register/actions';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values, dispatch) => {
      AsyncStorage.removeItem('emailAvailability');
      dispatch(verifyEmailRequest(values));
       return sleep(3000) // simulate server latency
        .then(() => {
          throw { email: 'Email already exit' };
        });
};


export default asyncValidate;
