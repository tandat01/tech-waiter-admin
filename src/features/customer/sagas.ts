import {all, select, call, put, takeLeading, takeEvery, takeLatest} from 'redux-saga/effects';
import customerService from './service';
import {message} from 'antd';
import {
    customerFormSubmitted,
    singleCustomerAdded,
    submitCustomerForm,
    customerFormIdChange,
    deleteCustomer,
    listCustomersLoaded,
    loadSingleCustomer,
    customerDeleted,
    customerDeleteFailed,
    customerFormChanged,
    customerParamsChange
} from './reducer';
import {safeCall} from '../../common/utils';
import {
    selectCustomerFormId,
    selectCustomerIds,
    selectCustomerListLoading,
    selectCustomerParams,
} from './selectors';
import {pushQueryToRouter} from '../../common/actions';
import {Rest} from '../../common/models/rest';
import {Customer} from '../../models/customer';
import {CustomerFormData} from './state';
import history from '../../config/history';
import {RouterEnum} from '../../common/enums';
import toNumber from 'lodash/toNumber';

const sagas = [
    takeLeading(submitCustomerForm, function* ({payload}) {
        try {
            const existedCustomer: number = yield select(selectCustomerFormId);

            const res: Rest<Customer> = existedCustomer
                ? yield call(customerService.edit, existedCustomer, payload)
                : yield call(customerService.create, payload);

            message.success(`${existedCustomer ? 'Sửa' : 'Thêm'} thông tin khách hàng thành công`);

            yield all([
                put(customerFormSubmitted(true)),
                put(singleCustomerAdded(res.data))
            ]);
            history.push(`${RouterEnum.customers}${RouterEnum.list}`);
        } catch (e) {
            yield put(customerFormSubmitted(false));
        }
    }),

    takeLeading(customerFormIdChange, safeCall(function* ({payload}) {
        const existedCustomer: number = yield select(selectCustomerFormId);
        if ((toNumber(payload) || null) === (toNumber(existedCustomer) || null)) {
            return;
        }

        if (payload) {
            const res: Rest<Customer> = yield call(customerService.single, payload);
            yield put(singleCustomerAdded(res.data, true));
        } else {
            yield put(customerFormChanged(new CustomerFormData(), null));
        }
    })),

    takeLatest(customerParamsChange, safeCall(function* ({meta}) {
        const loading = yield select(selectCustomerListLoading);
        if (!loading) {
            return;
        }

        const params = yield select(selectCustomerParams);
        const res: Rest<Customer> = yield call(customerService.list, params);
        yield put(listCustomersLoaded(res));
        if (meta) {
            yield put(pushQueryToRouter(params));
        }
    })),

    takeEvery(deleteCustomer, function* ({payload}) {
        try {
            yield call(customerService.delete, payload);
            message.success('Xóa thông tin khách hàng thành công');
            yield put(customerDeleted(payload));
        } catch (e) {
            yield put(customerDeleteFailed(payload));
        }
    }),

    takeEvery(loadSingleCustomer, safeCall(function* ({payload}) {
        const ids = yield select(selectCustomerIds);
        if (ids.includes(payload)) {
            return;
        }
        const res: Rest<Customer> = yield call(customerService.single, payload);
        yield put(singleCustomerAdded(res.data));
    }))
];


function* customerSagas() {
    yield all(sagas);
}

export default customerSagas;
