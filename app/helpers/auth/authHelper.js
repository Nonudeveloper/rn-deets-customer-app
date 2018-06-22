import jwtDecode from 'jwt-decode';
import SuperFetch from '../superFetch';
import { getItem } from '../asyncStorage';
import Instabug from 'instabug-reactnative';

class AuthHelper {
  login = async userInfo => {
    if (userInfo.flag === 3) {
       if (!userInfo.email || !userInfo.password) {
         return { error: 'please fill in the input' };
      }
    }
    return await SuperFetch.post('customer/user_login', userInfo).then(response => {
      const result = this.checkExpirity(response.access_token);
      result.user = response.user;
      return response;
    });
  };

  sendMail = async userInfo => {
    if (!userInfo.email) {
      return { error: 'please fill in the input' };
    }
    return await SuperFetch.post('customer/forgot_password_from_user_email', userInfo)
        .then(response => response);
  };

  async checkDemoPage(token) {
    if (this.checkExpirity(token).error) {
      return { error: 'Token expired' };
    }
    return await SuperFetch.post('secret/test', { token })
      .then(response => response)
      .catch(error => ({ error: JSON.stringify(error) }));
  }

  checkExpirity = token => {
    if (!token) {
      return {
        error: 'not matched'
      };
    }
    try {
      const profile = jwtDecode(token);
      const expiredAt = profile.expiredAt || profile.exp * 1000;

      if (expiredAt > new Date().getTime())
        return {
          ...profile,
          token,
          expiredAt: new Date(expiredAt)
        };
      return { error: 'Token expired' };
    } catch (e) {
      return { error: 'Server Error' };
    }
  };

  async logout() {
        const user = await getItem('user');
        const access_token = JSON.parse(user).access_token;
        const registration_type = 2;
        Instabug.logOut();
    return await SuperFetch.post('/customer/get_user_logout_from_app', { access_token, registration_type })
      .then(response => { return response; });
  }

  loginThroughAccessToken = async deviceToken => {
    const user = await getItem('user');
    const payload = {
      access_token: JSON.parse(user).access_token,
      registration_type: 2,
      device_token: deviceToken
    }
    return await SuperFetch.post('/customer/login_through_accesstoken', payload)
    .then(response => { return response; });
  }
}
export default new AuthHelper();
