import Toast from 'react-native-simple-toast';

const withToast = (message) => (
    Toast.show(message)
);

export const withToastLong = (message) => (
    Toast.show(message, Toast.LONG)
);

export default withToast;
