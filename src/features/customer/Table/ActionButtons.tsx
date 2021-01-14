import React, {memo} from 'react';
import {Button, Popconfirm, Space} from 'antd';
import {RouterEnum} from '../../../common/enums';
import { Link } from 'react-router-dom';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {selectSingleCustomer} from '../selectors';
import { deleteCustomer } from '../reducer';

interface CustomerTableActionButtonsProps {
    itemId: number;
}

const VehicleTableActionButtons = memo(({itemId}: CustomerTableActionButtonsProps) => {
    const customer = useSelector(selectSingleCustomer(itemId), shallowEqual);
    const editLink = `${RouterEnum.customers}${RouterEnum.edit}/${itemId}`;
    const dispatch = useDispatch();
    const doDelete = () => {
        dispatch(deleteCustomer(itemId));
    };

    return (
        <Space size={'small'}>
            <Link to={editLink}>Sửa</Link>
            <Popconfirm title={`Bạn chắc chắn muốn ban khách hàng: ${customer?.name} chứ?`}
                        onConfirm={doDelete}
                        placement={'topRight'}>
                <Button type={'link'} className={'color-danger'}>
                    Ban
                </Button>
            </Popconfirm>
        </Space>
    );
});

export default VehicleTableActionButtons;
