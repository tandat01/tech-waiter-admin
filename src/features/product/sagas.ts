import { all, select, call, put, takeLeading, takeEvery, takeLatest } from 'redux-saga/effects';
import productService from './service';
import {message} from 'antd';
import {
    productFormSubmitted,
    singleProductAdded,
    submitProductForm,
    productFormIdChange,
    deleteProduct,
    listProductsLoaded,
    loadSingleProduct,
    productDeleted,
    productDeleteFailed,
    productFormChanged,
    productParamsChange
} from './reducer';
import {safeCall} from '../../common/utils';
import {
    selectProductIds,
    selectProductListLoading,
    selectProductOfForm,
    selectProductParams,
    selectSingleProduct
} from './selectors';
import {pushQueryToRouter} from '../../common/actions';
import {Rest} from '../../common/models/rest';
import {Product} from '../../models/product';
import {ProductFormData} from './state';
import history from '../../config/history';
import {RouterEnum} from '../../common/enums';

const sagas = [
    takeLeading(submitProductForm, function* onSubmitProductForm({payload}) {
        try {
            const existedProduct: Product = yield select(selectProductOfForm);

            const res: Rest<Product> = existedProduct
                ? yield call(productService.edit, existedProduct.slug, payload)
                : yield call(productService.create, payload);

            message.success(`${existedProduct ? 'Sửa' : 'Tạo'} sản phẩm thành công`);

            yield all([
                put(productFormSubmitted(true)),
                put(singleProductAdded(res.data))
            ]);
            history.push(`${RouterEnum.products}${RouterEnum.list}`);
        } catch (e) {
            yield put(productFormSubmitted(false));
        }
    }),

    takeLeading(productFormIdChange, safeCall(function* ({payload}) {
        const existedProduct: Product = yield select(selectProductOfForm)
            if ((payload || null) === (existedProduct?.slug || null)) {
                return;
            }

            if (payload) {
                const res: Rest<Product> = yield call(productService.single, payload);
                yield put(singleProductAdded(res.data, true));
            } else {
                yield put(productFormChanged(new ProductFormData(), payload as any));
            }
        }
    )),

    takeLatest(productParamsChange, safeCall(function* ({meta}) {
        const loading = yield select(selectProductListLoading);
        if (!loading) {
            return;
        }

        const params = yield select(selectProductParams);
        const res: Rest<Product> = yield call(productService.list, params);
        yield put(listProductsLoaded(res));
        if (meta) {
            yield put(pushQueryToRouter(params));
        }
    })),

    takeEvery(deleteProduct, function* ({payload}) {
        try {
            const product: Product = yield select(selectSingleProduct(payload));
            yield call(productService.delete, product.slug);
            message.success('Xóa sản phẩm thành công');
            yield put(productDeleted(payload));
        } catch (e) {
            yield put(productDeleteFailed(payload));
        }
    }),

    takeEvery(loadSingleProduct, safeCall(function* ({payload}) {
        const ids = yield select(selectProductIds);
        if (ids.includes(payload)) {
            return;
        }
        const res: Rest<Product> = yield call(productService.single, payload);
        yield put(singleProductAdded(res.data));
    }))
];


function* productSagas() {
    yield all(sagas);
}

export default productSagas;
