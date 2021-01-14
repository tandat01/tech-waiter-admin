import {CRUDService} from '../../common/service';
import {Product} from '../../models/product';
import {ProductFormData, ProductParams} from './state';
import {RouterEnum} from '../../common/enums';

export class ProductService extends CRUDService<Product, ProductFormData, ProductParams, string> {
    getNameSpace(): string {
        return RouterEnum.products;
    }
}

const productService = new ProductService();

export default productService;
