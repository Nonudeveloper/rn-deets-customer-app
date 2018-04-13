import SuperFetch from '../superFetch';
import { getItem } from '../asyncStorage';

class ServicesHelper {

    async fetchAllServices() {
        const user = await getItem('user');
        // const token = await getItem('token');
        return await SuperFetch.post('customer/get_default_services_and_adds_on', { access_token: JSON.parse(user).access_token })
        .then(response => response)
        .catch(error => ({ error: JSON.stringify(error) }));
    }
}

export default new ServicesHelper();

