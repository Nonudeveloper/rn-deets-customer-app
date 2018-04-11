import SuperFetch from '../superFetch';
import { getItem } from '../asyncStorage';

class ServicesHelper {

    async fetchAllServices(payload) {
        const user = await getItem('user');
        const token = await getItem('token');
        console.log(token);
        return await SuperFetch.post('customer/get_default_services_and_adds_on', { access_token: token })
        .then(response => response)
        .catch(error => ({ error: JSON.stringify(error) }));
    }
}

export default new ServicesHelper();

