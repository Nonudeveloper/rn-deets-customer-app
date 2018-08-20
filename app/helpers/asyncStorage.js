import { AsyncStorage } from 'react-native';


export const setItem = async (name, data) => {
    try {
        await AsyncStorage.removeItem(name);
        await AsyncStorage.setItem(name, JSON.stringify(data));
    } catch (error) {
        // Error saving data
        console.log('AsyncStorage save error: ' + error.message);
    }
};

export const getItem = async (name) => new Promise((resolve, reject) => {
    AsyncStorage.getItem(name)
      .then(res => {
        if (res !== null) {
          resolve(res);
        } else {
            const error = 'unable to process';
             reject({ error });
        }
      })
      .catch(err => reject(err));
  });

export const removeItem = async (name) => {
    try {
        await AsyncStorage.removeItem(name);
    } catch (error) {
        // Error removing data
        console.log('AsyncStorage remove error: ' + error.message);
    }
    
};

export const setCardDetails = async (card) => {
    try {
        await AsyncStorage.removeItem('authCardDetails');
        await AsyncStorage.setItem('authCardDetails', JSON.stringify(card));
        console.log('data stored');
    } catch (error) {
        // Error saving data
        console.log('AsyncStorage save error: ' + error.message);
    }
  };

  export const getCardDetails = async (name) => new Promise((resolve, reject) => {
      AsyncStorage.getItem(name)
        .then(res => {
            console.log(res)
          if (res !== null) {
            resolve(res);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
  });
