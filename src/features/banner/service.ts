import {CRUDService} from '../../common/service';
import {Banner} from '../../models/banner';
import {BannerFormData} from './state';
import {RouterEnum} from '../../common/enums';

export class BannerService extends CRUDService<Banner, BannerFormData> {
    getNameSpace(): string {
        return RouterEnum.banners;
    }
}

const bannerService = new BannerService();

export default bannerService;
