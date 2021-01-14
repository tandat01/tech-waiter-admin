import { all, select, call, put, takeLeading, takeEvery, takeLatest } from 'redux-saga/effects';
import bannerService from './service';
import {message} from 'antd';
import {
    bannerFormSubmitted,
    singleBannerAdded,
    submitBannerForm,
    bannerFormIdChange,
    deleteBanner,
    listBannersLoaded,
    loadSingleBanner,
    bannerDeleted,
    bannerDeleteFailed,
    bannerFormChanged,
    refreshListBanner
} from './reducer';
import {safeCall} from '../../common/utils';
import {
    selectBannerFormId,
    selectBannerIds,
    selectBannerListLoading
} from './selectors';
import {Rest} from '../../common/models/rest';
import {Banner} from '../../models/banner';
import {BannerFormData} from './state';
import history from '../../config/history';
import {RouterEnum} from '../../common/enums';
import toNumber from 'lodash/toNumber';

const sagas = [
    takeLeading(submitBannerForm, function* onSubmitBannerForm({payload}) {
        try {
            const existedBanner: number = yield select(selectBannerFormId);

            const res: Rest<Banner> = existedBanner
                ? yield call(bannerService.edit, existedBanner, payload)
                : yield call(bannerService.create, payload);

            message.success(`${existedBanner ? 'Sửa' : 'Tạo'} banner thành công`);

            yield all([
                put(bannerFormSubmitted(true)),
                put(singleBannerAdded(res.data))
            ]);
            history.push(`${RouterEnum.banners}${RouterEnum.list}`);
        } catch (e) {
            yield put(bannerFormSubmitted(false));
        }
    }),

    takeLeading(bannerFormIdChange, safeCall(function* ({payload}) {
        const existedBanner: number = yield select(selectBannerFormId);
            if ((toNumber(payload) || null) === (toNumber(existedBanner) || null)) {
                return;
            }

            if (payload) {
                const res: Rest<Banner> = yield call(bannerService.single, payload);
                yield put(singleBannerAdded(res.data, true));
            } else {
                yield put(bannerFormChanged(new BannerFormData(), null));
            }
        }
    )),

    takeLatest(refreshListBanner, safeCall(function* () {
        const loading = yield select(selectBannerListLoading);
        if (!loading) {
            return;
        }
        const res: Rest<Banner> = yield call(bannerService.list);
        yield put(listBannersLoaded(res));
    })),

    takeEvery(deleteBanner, function* ({payload}) {
        try {
            yield call(bannerService.delete, payload);
            message.success('Xóa banner thành công');
            yield put(bannerDeleted(payload));
        } catch (e) {
            yield put(bannerDeleteFailed(payload));
        }
    }),

    takeEvery(loadSingleBanner, safeCall(function* ({payload}) {
        const ids = yield select(selectBannerIds);
        if (ids.includes(payload)) {
            return;
        }
        const res: Rest<Banner> = yield call(bannerService.single, payload);
        yield put(singleBannerAdded(res.data));
    }))
];


function* bannerSagas() {
    yield all(sagas);
}

export default bannerSagas;
