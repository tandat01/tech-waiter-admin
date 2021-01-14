import React from 'react';
import {Pagination} from 'antd';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {selectCustomerPaginationTotal, selectCustomerParams} from '../selectors';
import {customerParamsChange} from '../reducer';

function CustomerTablePagination() {
    const params = useSelector(selectCustomerParams, shallowEqual);
    const total = useSelector(selectCustomerPaginationTotal);

    const dispatch = useDispatch();

    const onChange = (page: number, pageSize?: number) => {
        if (pageSize !== params.limit) {
            dispatch(customerParamsChange({page: 1, limit: pageSize}, true));
        } else if (page !== params.page) {
            dispatch(customerParamsChange({page}, true));
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

export default CustomerTablePagination;
