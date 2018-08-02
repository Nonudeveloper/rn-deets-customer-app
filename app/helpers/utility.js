import { AsyncStorage } from 'react-native';
import Instabug from 'instabug-reactnative';

export const AUTH_TOKEN = 'token';
export const USER = 'user';


export const onSignOut = () => AsyncStorage.removeItem(USER);

export const isSignedIn = () => {
  AsyncStorage.removeItem(AUTH_TOKEN);
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER)
      .then(res => {
        console.log(res);
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};


export function clearToken() {
  AsyncStorage.removeItem(AUTH_TOKEN);
}
export function setToken(token) {
  AsyncStorage.setItem(AUTH_TOKEN, token);
}

export function getToken() {
  try {
    const idToken = AsyncStorage.getItem(AUTH_TOKEN);
    return idToken;
  } catch (err) {
    clearToken();
  }
}

export function setUser(user) {
  setLoginUser(user);
  Instabug.identifyUserWithEmail(user.email, `${user.first_name} ${user.last_name}`);
  // AsyncStorage.setItem(USER, JSON.stringify(user));
}

const setLoginUser = async (user) => {
        try {
            await AsyncStorage.setItem(USER, JSON.stringify(user));
            console.log('data stored');
        } catch (error) {
            // Error saving data
            console.log('AsyncStorage save error: ' + error.message);
        }
};

export function dataURItoBlob(dataURI) {
  if (!global.atob) {
    global.atob = require('base-64').decode;
  }
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = global.atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

export function dataURLtoFile(dataurl, filename) {
  if (!global.atob) {
    global.atob = require('base-64').decode;
  }

  var arr = dataurl.split(','), 
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = global.atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);

  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}


// export const getBase64ImageFromUrl = async (imageUrl) => {
//   const res = await fetch(imageUrl);
//   const blob = await res.blob();

//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => {
//         resolve(reader.result);
//     }, false);

//     reader.onerror = () => {
//       return reject(this);
//     };
//     reader.readAsDataURL(blob);
//   });
// };

export const toDataUrl = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
          callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
};


export const saveAuthVehiclesData = async (vehicle) => {
  try {
      AsyncStorage.removeItem('authVehicles');
      await AsyncStorage.setItem('authVehicles', JSON.stringify(vehicle));
      console.log('data stored');
  } catch (error) {
      // Error saving data
      console.log('AsyncStorage save error: ' + error.message);
  }
};

export function renderFormatedDate(fullDate) {
  const dateObj = new Date(fullDate);
  const day = dateObj.getDay();
  const date = dateObj.getDate();
  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  // const dateStr = dateObj.toString().split(' ')[0];
  // const arr = fullDate.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = dateObj.getFullYear();

  return `${daysList[day]} ${date} ${months[dateObj.getMonth()]}. ${year}`;
}

export function renderFormatedTime(date) {
  const dateObj = new Date(date);
  let hour = dateObj.getHours();
  let minute = dateObj.getMinutes();
  const second = dateObj.getSeconds();
  let prepand = (hour >= 12) ? 'PM' : 'AM';
  hour = (hour >= 12) ? hour - 12 : hour;
  if (hour === 0 && prepand === ' PM ') { 
      if (minute === 0 && second === 0) { 
          hour = 12;
          prepand = ' Noon';
      } else { 
          hour = 12;
          prepand = ' PM';
      } 
  } 
  if (hour === 0 && prepand === ' AM ') { 
      if (minute === 0 && second === 0) { 
          hour = 12;
          prepand = ' Midnight';
      } else { 
          hour = 12;
          prepand = ' AM';
      } 
  } 

  if (hour < 10) {
      hour = `0${hour}`;
  }

  if (minute < 10) {
    minute = '0' + minute.toString();
  }

  return `${hour}:${minute} ${prepand}`;
}
