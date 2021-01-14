import React, {memo} from 'react';
import UserTableSearchBar from './SearchBar';
import {shallowEqual, useSelector} from 'react-redux';
import {selectListUsers} from '../selectors';
import {Table} from 'antd';
import {ColumnProps} from 'antd/es/table';
import {CommonStatus} from '../../../common/enums';
import CommonStatusLabel from '../../../common/components/CommonStatusLabel';
import UserTableActionButtons from './ActionButtons';
import UserTablePagination from './Pagination';
import {User} from '../../../models/user';

const columns: ColumnProps<User>[] = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Tài khoản',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
    },
    {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
        render: (status: CommonStatus) => (<CommonStatusLabel status={status}/>),
    },

    {
        title: 'Thao tác',
        key: 'id',
        dataIndex: 'id',
        render: (id: number) => (<UserTableActionButtons itemId={id}/>),
    },
];

const TableDisplay = () => {
    const dataSource = useSelector(selectListUsers, shallowEqual);
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            size="small"
            rowKey={'id'}
            className="w-100"
            scroll={{x: '800px'}}
            bordered={false}
        />
    );
}

const UserTable = memo(() => {
    return (
        <>
            <UserTableSearchBar/>
            <TableDisplay/>
            <UserTablePagination/>
        </>
    );
});

export default UserTable;
