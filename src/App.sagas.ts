import {all} from 'redux-saga/effects';
import authSagas from './features/auth/sagas';
import {commonSagas} from './common/actions';
import categorySagas from './features/category/sagas';
import productSagas from './features/product/sagas';
import tagSagas from './features/tag/sagas';
import bannerSagas from './features/banner/sagas';
import customerSagas from './features/customer/sagas';
import userSagas from './features/user/sagas';
import contactMessageSagas from './features/contact-message/sagas';

function* AppSagas() {
    yield all([
        commonSagas(),
        authSagas(),
        categorySagas(),
        productSagas(),
        tagSagas(),
        bannerSagas(),
        customerSagas(),
        userSagas(),
        contactMessageSagas(),
    ]);
}

export default AppSagas;
