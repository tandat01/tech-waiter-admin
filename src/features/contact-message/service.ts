import {ContactMessageParams} from './state';
import {filterParams} from '../../common/utils';
import axios from '../../common/axios';
import {Rest} from '../../common/models/rest';
import {BASE_URL} from '../../config/properties';
import {ContactMessage} from '../../models/contact-message';
import {RouterEnum} from '../../common/enums';

const {orders} = RouterEnum;

export class ContactMessageService {

    list(rawParams: ContactMessageParams) {
        const params = rawParams ? filterParams(rawParams) : {};
        return axios.get<Rest<ContactMessage>>(
            `${BASE_URL}${orders}`,
            {params}
        );
    }

    read(id: number) {
        return axios.put(`${BASE_URL}${orders}/${id}/read`);
    }

    resolve(id: number) {
        return axios.put(`${BASE_URL}${orders}/${id}/done`);
    }

    delete(id: number) {
        return axios.delete(`${BASE_URL}${orders}/${id}`);
    }

}

const contactMessageService = new ContactMessageService();

export default contactMessageService;
