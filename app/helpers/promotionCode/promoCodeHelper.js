import SuperFetch from '../superFetch';
import { getItem } from '../asyncStorage';

class PromoCodeHelper {

    getPromoCode = async () => {
        return await SuperFetch.post('customer/show_Latest_promo_code');
    }

    usePromoCode = async (promoCode) => {
        const user = await getItem('user');
        const data = {
            access_token: JSON.parse(user).access_token,
            promo_code: promoCode.promo_code
        };
        return await SuperFetch.post('customer/use_promo_code_by_user', data);
    }
  
}

export default new PromoCodeHelper();
