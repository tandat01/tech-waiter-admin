import React from 'react';
import {Pagination} from 'antd';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {selectUserPaginationTotal, selectUserParams} from '../selectors';
import {userParamsChange} from '../reducer';

function UserTablePagination() {
    const params = useSelector(selectUserParams, shallowEqual);
    const total = useSelector(selectUserPaginationTotal);

    const dispatch = useDispatch();

    const onChange = (page: number, pageSize?: number) => {
        if (pageSize !== params.limit) {
            dispatch(userParamsChange({page: 1, limit: pageSize}, true));
        } else if (page !== params.page) {
            dispatch(userParamsChange({page}, true));
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

export default UserTablePagination;
