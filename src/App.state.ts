import AuthState from './features/auth/state';
import {CategoryState} from './features/category/state';
import {ProductState} from './features/product/state';
import {TagState} from './features/tag/state';
import {BannerState} from './features/banner/state';
import {CustomerState} from './features/customer/state';
import {UserState} from './features/user/state';

interface AppState {
    auth: AuthState;
    category: CategoryState;
    product: ProductState;
    tag: TagState;
    banner: BannerState;
    customer: CustomerState;
    user: UserState;
}

export default AppState;
