import { all, select, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import contactMessageService from './service';
import {message} from 'antd';
import {
    singleContactMessageAdded,
    deleteContactMessage,
    listContactMessagesLoaded,
    contactMessageDeleted,
    contactMessageParamsChange,
    endInteractWithContactMessage,
    resolveContactMessage,
    readContactMessage
} from './reducer';
import {safeCall} from '../../common/utils';
import {
    selectContactMessageListLoading,
    selectContactMessageParams
} from './selectors';
import {pushQueryToRouter} from '../../common/actions';
import {Rest} from '../../common/models/rest';
import {ContactMessage} from '../../models/contact-message';

const sagas = [
    takeLatest(contactMessageParamsChange, safeCall(function* ({meta}) {
        const loading = yield select(selectContactMessageListLoading);
        if (!loading) {
            return;
        }

        const params = yield select(selectContactMessageParams);
        const res: Rest<ContactMessage> = yield call(contactMessageService.list, params);
        yield put(listContactMessagesLoaded(res));
        if (meta) {
            yield put(pushQueryToRouter(params));
        }
    })),

    takeEvery(deleteContactMessage, function* ({payload}) {
        try {
            yield call(contactMessageService.delete, payload);
            message.success('Xóa tin nhắn thành công');
            yield put(contactMessageDeleted(payload));
        } catch (e) {
            yield put(endInteractWithContactMessage(payload));
        }
    }),

    takeEvery(resolveContactMessage, function* ({payload}) {
        try {
            const res: Rest<ContactMessage> = yield call(contactMessageService.resolve, payload);
            message.success('Đánh dấu tin nhắn là đã xử lý');
            yield all([
                put(singleContactMessageAdded(res.data)),
                put(endInteractWithContactMessage(payload))
            ]);
        } catch (e) {
            endInteractWithContactMessage(payload)
        }
    }),

    takeEvery(readContactMessage, function* ({payload}) {
        try {
            const res: Rest<ContactMessage> = yield call(contactMessageService.read, payload);
            yield all([
                put(singleContactMessageAdded(res.data)),
                put(endInteractWithContactMessage(payload))
            ]);
        } catch (e) {
            endInteractWithContactMessage(payload)
        }
    }),
];


function* contactMessageSagas() {
    yield all(sagas);
}

export default contactMessageSagas;
