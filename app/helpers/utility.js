import { AsyncStorage } from "react-native";

export const AUTH_TOKEN = "id_token";



export const onSignOut = () => AsyncStorage.removeItem(AUTH_TOKEN);

export const isSignedIn = () => {
    AsyncStorage.removeItem(AUTH_TOKEN);
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(AUTH_TOKEN)
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