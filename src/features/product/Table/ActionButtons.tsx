import React, {memo} from 'react';
import {Button, Popconfirm, Space} from 'antd';
import {RouterEnum} from '../../../common/enums';
import { Link } from 'react-router-dom';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {selectSingleProduct} from '../selectors';
import { deleteProduct } from '../reducer';

interface VehicleTableActionButtonsProps {
    itemId: number;
}

const VehicleTableActionButtons = memo(({itemId}: VehicleTableActionButtonsProps) => {
    const product = useSelector(selectSingleProduct(itemId), shallowEqual);
    const editLink = `${RouterEnum.products}${RouterEnum.edit}/${product?.slug}`;
    const dispatch = useDispatch();
    const doDelete = () => {
        dispatch(deleteProduct(itemId));
    };

    return (
        <Space size={'small'}>
            <Link to={editLink}>Sửa</Link>
            <Popconfirm title={`Bạn chắc chắn muốn xóa sản phẩm: ${product?.name} chứ?`}
                        onConfirm={doDelete}
                        placement={'topRight'}>
                <Button type={'link'} className={'color-danger'}>
                    Xóa
                </Button>
            </Popconfirm>
        </Space>
    );
});

export default VehicleTableActionButtons;
