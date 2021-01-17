import React from 'react';
import {Pagination} from 'antd';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {selectContactMessagePaginationTotal, selectContactMessageParams} from '../selectors';
import {contactMessageParamsChange} from '../reducer';

function ContactMessageTablePagination() {
    const params = useSelector(selectContactMessageParams, shallowEqual);
    const total = useSelector(selectContactMessagePaginationTotal);

    const dispatch = useDispatch();

    const onChange = (page: number, pageSize?: number) => {
        if (pageSize !== params.limit) {
            dispatch(contactMessageParamsChange({page: 1, limit: pageSize}, true));
        } else if (page !== params.page) {
            dispatch(contactMessageParamsChange({page}, true));
        }
    };

    return (
        <Pagination className="ant-table-pagination ant-table-pagination-right"
                    current={params.page}
                    pageSize={params.limit}
                    total={total}
                    showQuickJumper
                    showSizeChanger
                    onChange={onChange}
                    size={'small'}
        />
    );
}

export default ContactMessageTablePagination;
