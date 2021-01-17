import {combineReducers} from 'redux';
import auth from './features/auth/reducer';
import category from './features/category/reducer';
import product from './features/product/reducer';
import tag from './features/tag/reducer';
import banner from './features/banner/reducer';
import customer from './features/customer/reducer';
import user from './features/user/reducer';
import contactMessage from './features/contact-message/reducer';

const AppReducer = combineReducers({
    auth,
    category,
    product,
    tag,
    banner,
    customer,
    user,
    contactMessage
});

export default AppReducer;
