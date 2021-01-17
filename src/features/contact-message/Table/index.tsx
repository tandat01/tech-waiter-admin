import React, {memo} from 'react';
import ContactMessageTableSearchBar from './SearchBar';
import {shallowEqual, useSelector} from 'react-redux';
import {selectListContactMessages} from '../selectors';
import {Table} from 'antd';
import {ColumnProps} from 'antd/es/table';
import ContactMessageTableActionButtons from './ActionButtons';
import ContactMessageTablePagination from './Pagination';
import {ContactMessage} from '../../../models/contact-message';
import {Customer} from '../../../models/customer';
import {ContactMessageStatus} from '../../../models/enums/contact-message-status';
import StatusLabel from '../../../common/components/StatusLabel';
import ContactMessageDetail from './Detail';
import {Link} from 'react-router-dom';
import {RouterEnum} from '../../../common/enums';

const columns: ColumnProps<ContactMessage>[] = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Bàn',
        dataIndex: 'customer',
        key: 'customer',
        render: (customer?: Customer) =>
            <Link to={`${RouterEnum.customers}${RouterEnum.edit}/${customer?.id}`}>
                {customer?.name}
            </Link>
    },
    {
        title: 'Giá',
        dataIndex: 'total_price',
        key: 'total_price',
        render: (price: number) => price.toLocaleString('en-US')
    },
    {
        title: 'Order lúc',
        dataIndex: 'created_at',
        key: 'created_at',
    },
    {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
        render: (status: ContactMessageStatus) => (
            <StatusLabel enumObj={ContactMessageStatus}
                         enumName={'ContactMessageStatus'}
                         status={status}/>
        ),
    },

    {
        title: 'Thao tác',
        key: 'id',
        dataIndex: 'id',
        render: (id: number) => (<ContactMessageTableActionButtons itemId={id}/>),
    },
];

const TableDisplay = () => {
    const dataSource = useSelector(selectListContactMessages, shallowEqual);
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

const ContactMessageTable = memo(() => {
    return (
        <>
            <ContactMessageTableSearchBar/>
            <TableDisplay/>
            <ContactMessageTablePagination/>
            <ContactMessageDetail/>
        </>
    );
});

export default ContactMessageTable;
