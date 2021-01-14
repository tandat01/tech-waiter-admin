import React, {memo} from 'react';
import {Button, Popconfirm, Space} from 'antd';
import {RouterEnum} from '../../../common/enums';
import { Link } from 'react-router-dom';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {selectSingleUser} from '../selectors';
import { deleteUser } from '../reducer';

interface UserTableActionButtonsProps {
    itemId: number;
}

const UserTableActionButtons = memo(({itemId}: UserTableActionButtonsProps) => {
    const user = useSelector(selectSingleUser(itemId), shallowEqual);
    const editLink = `${RouterEnum.users}${RouterEnum.edit}/${itemId}`;
    const dispatch = useDispatch();
    const doDelete = () => {
        dispatch(deleteUser(itemId));
    };

    return (
        <Space size={'small'}>
            <Link to={editLink}>Sửa</Link>
            <Popconfirm title={`Bạn chắc chắn muốn xóa tài khoản: ${user?.username} chứ?`}
                        onConfirm={doDelete}
                        placement={'topRight'}>
                <Button type={'link'} className={'color-danger'}>
                    Xóa
                </Button>
            </Popconfirm>
        </Space>
    );
});

export default UserTableActionButtons;
