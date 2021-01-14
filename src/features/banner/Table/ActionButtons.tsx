import React, {memo} from 'react';
import {Button, Popconfirm, Space} from 'antd';
import {RouterEnum} from '../../../common/enums';
import { Link } from 'react-router-dom';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {selectSingleBanner} from '../selectors';
import { deleteBanner } from '../reducer';

interface VehicleTableActionButtonsProps {
    itemId: number;
}

const VehicleTableActionButtons = memo(({itemId}: VehicleTableActionButtonsProps) => {
    const banner = useSelector(selectSingleBanner(itemId), shallowEqual);
    const editLink = `${RouterEnum.banners}${RouterEnum.edit}/${banner?.id}`;
    const dispatch = useDispatch();
    const doDelete = () => {
        dispatch(deleteBanner(itemId));
    };

    return (
        <Space size={'small'}>
            <Link to={editLink}>Sửa</Link>
            <Popconfirm title={`Bạn chắc chắn muốn xóa banner: ${banner?.title} chứ?`}
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
