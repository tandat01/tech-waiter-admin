import React from 'react';
import {Pagination} from 'antd';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {selectProductPaginationTotal, selectProductParams} from '../selectors';
import {productParamsChange} from '../reducer';

function ProductTablePagination() {
    const params = useSelector(selectProductParams, shallowEqual);
    const total = useSelector(selectProductPaginationTotal);

    const dispatch = useDispatch();

    const onChange = (page: number, pageSize?: number) => {
        if (pageSize !== params.limit) {
            dispatch(productParamsChange({page: 1, limit: pageSize}, true));
        } else if (page !== params.page) {
            dispatch(productParamsChange({page}, true));
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

export default ProductTablePagination;
