import { all, select, call, put, debounce } from 'redux-saga/effects';
import tagService from './service';
import {
    listTagsLoaded,
    tagParamsChange
} from './reducer';
import {safeCall} from '../../common/utils';
import {
    selectTagListLoading,
    selectTagParams,
} from './selectors';
import {pushQueryToRouter} from '../../common/actions';
import {Rest} from '../../common/models/rest';
import {Tag} from '../../models/tag';

const sagas = [
    debounce(500, tagParamsChange, safeCall(function* ({meta}) {
        const loading = yield select(selectTagListLoading);
        if (!loading) {
            return;
        }

        const params = yield select(selectTagParams);
        const res: Rest<Tag> = yield call(tagService.list, params);
        yield put(listTagsLoaded(res));
        if (meta) {
            yield put(pushQueryToRouter(params));
        }
    })),
];


function* tagSagas() {
    yield all(sagas);
}

export default tagSagas;
