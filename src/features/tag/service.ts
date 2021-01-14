import {CRUDService} from '../../common/service';
import { TagParams } from './state';
import {RouterEnum} from '../../common/enums';
import {Tag} from '../../models/tag';

export class ProductService extends CRUDService<Tag, any, TagParams> {
    getNameSpace(): string {
        return RouterEnum.tags;
    }
}

const productService = new ProductService();

export default productService;
