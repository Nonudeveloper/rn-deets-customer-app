import Toast from 'react-native-simple-toast';

const withToast = (message) => (
    Toast.show(message)
    );

export default withToast;
