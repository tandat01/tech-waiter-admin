import {CRUDService} from '../../common/service';
import {Customer} from '../../models/customer';
import {CustomerFormData, CustomerParams} from './state';
import {RouterEnum} from '../../common/enums';

export class CustomerService extends CRUDService<Customer, CustomerFormData, CustomerParams> {
    getNameSpace(): string {
        return RouterEnum.customers;
    }
}

const customerService = new CustomerService();

export default customerService;
