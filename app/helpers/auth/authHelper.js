import jwtDecode from 'jwt-decode';
import SuperFetch from '../superFetch';

class AuthHelper {
  login = async userInfo => {
    
    if(userInfo.flag == 3){
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
    return await SuperFetch.post('/customer/forgot_password_from_user_email', userInfo).then(response => {
      return response;
    });
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
      else {
        return { error: 'Token expired' };
      }
    } catch (e) {
      return { error: 'Server Error' };
    }
  };
}
export default new AuthHelper();
