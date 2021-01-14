import {CRUDService} from '../../common/service';
import {User} from '../../models/user';
import {UserFormData, UserParams} from './state';
import {RouterEnum} from '../../common/enums';

export class UserService extends CRUDService<User, UserFormData, UserParams> {
    getNameSpace(): string {
        return RouterEnum.users;
    }
}

const userService = new UserService();

export default userService;
