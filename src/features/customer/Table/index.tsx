import React, {memo} from 'react';
import CustomerTableSearchBar from './SearchBar';
import {shallowEqual, useSelector} from 'react-redux';
import {selectListCustomers} from '../selectors';
import {Table} from 'antd';
import {ColumnProps} from 'antd/es/table';
import {CommonStatus, RouterEnum} from '../../../common/enums';
import CommonStatusLabel from '../../../common/components/CommonStatusLabel';
import CustomerTableActionButtons from './ActionButtons';
import CustomerTablePagination from './Pagination';
import {Customer} from '../../../models/customer';
import {User} from "../../../models/user";
import { Link } from 'react-router-dom';

const columns: ColumnProps<Customer>[] = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Tên bàn',
        dataIndex: 'name',
        key: 'name',
        // render: (images: string) => <img src={images} style={{width: '50px'}} alt=""/>
    },
    {
        title: 'Tải khoản sử dụng',
        dataIndex: 'user',
        key: 'user',
        render: (user?: User) => (
            <>
                {
                    user
                        ? (
                            <Link to={`${RouterEnum.users}${RouterEnum.edit}/${user.id}`}>{user.username}</Link>
                        )
                        : null
                }
            </>
        )
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
        render: (id: number) => (<CustomerTableActionButtons itemId={id}/>),
    },
];

const TableDisplay = () => {
    const dataSource = useSelector(selectListCustomers, shallowEqual);
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

const CustomerTable = memo(() => {
    return (
        <>
            <CustomerTableSearchBar/>
            <TableDisplay/>
            <CustomerTablePagination/>
        </>
    );
});

export default CustomerTable;
