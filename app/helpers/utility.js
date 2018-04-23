import { AsyncStorage } from 'react-native';

export const AUTH_TOKEN = 'id_token';
export const USER = 'user';


export const onSignOut = () => AsyncStorage.removeItem(AUTH_TOKEN);

export const isSignedIn = () => {
    AsyncStorage.removeItem(AUTH_TOKEN);
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER)
      .then(res => {
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
  AsyncStorage.setItem(USER, JSON.stringify(user));
}

export function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);
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
  var arr = dataurl.split(','), 
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);

  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export const getBase64ImageFromUrl = async (imageUrl) => {
  const res = await fetch(imageUrl);
  const blob = await res.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        resolve(reader.result);
    }, false);

    reader.onerror = () => {
      return reject(this);
    };
    reader.readAsDataURL(blob);
  });
};

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
