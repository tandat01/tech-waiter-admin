import {all, select, call, put, takeLeading, takeEvery, takeLatest} from 'redux-saga/effects';
import userService from './service';
import {message} from 'antd';
import {
    userFormSubmitted,
    singleUserAdded,
    submitUserForm,
    userFormIdChange,
    deleteUser,
    listUsersLoaded,
    loadSingleUser,
    userDeleted,
    userDeleteFailed,
    userFormChanged,
    userParamsChange
} from './reducer';
import {safeCall} from '../../common/utils';
import {
    selectUserIds,
    selectUserListLoading,
    selectUserParams,
    selectUserFormId
} from './selectors';
import {pushQueryToRouter} from '../../common/actions';
import {Rest} from '../../common/models/rest';
import {User} from '../../models/user';
import {UserFormData} from './state';
import history from '../../config/history';
import {RouterEnum} from '../../common/enums';
import toNumber from 'lodash/toNumber';

const sagas = [
    takeLeading(submitUserForm, function* onSubmitUserForm({payload}) {
        try {
            const existedUser: number = yield select(selectUserFormId);

            const res: Rest<User> = existedUser
                ? yield call(userService.edit, existedUser, payload)
                : yield call(userService.create, payload);

            message.success(`${existedUser ? 'Sửa' : 'Tạo'} tài khoản thành công`);

            yield all([
                put(userFormSubmitted(true)),
                put(singleUserAdded(res.data))
            ]);
            history.push(`${RouterEnum.users}${RouterEnum.list}`);
        } catch (e) {
            yield put(userFormSubmitted(false));
        }
    }),

    takeLeading(userFormIdChange, safeCall(function* ({payload}) {
        const existedUser: number = yield select(selectUserFormId);
        if ((toNumber(payload) || null) === (existedUser || null)) {
            return;
        }

        if (payload) {
            const res: Rest<User> = yield call(userService.single, payload);
            yield put(singleUserAdded(res.data, true));
        } else {
            yield put(userFormChanged(new UserFormData(), null));
        }
    })),

    takeLatest(userParamsChange, safeCall(function* ({meta}) {
        const loading = yield select(selectUserListLoading);
        if (!loading) {
            return;
        }

        const params = yield select(selectUserParams);
        const res: Rest<User> = yield call(userService.list, params);
        yield put(listUsersLoaded(res));
        if (meta) {
            yield put(pushQueryToRouter(params));
        }
    })),

    takeEvery(deleteUser, function* ({payload}) {
        try {
            yield call(userService.delete, payload);
            message.success('Xóa tài khoản thành công');
            yield put(userDeleted(payload));
        } catch (e) {
            yield put(userDeleteFailed(payload));
        }
    }),

    takeEvery(loadSingleUser, safeCall(function* ({payload}) {
        const ids = yield select(selectUserIds);
        if (ids.includes(payload)) {
            return;
        }
        const res: Rest<User> = yield call(userService.single, payload);
        yield put(singleUserAdded(res.data));
    })),
];


function* userSagas() {
    yield all(sagas);
}

export default userSagas;
