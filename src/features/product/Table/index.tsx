import React, {memo} from 'react';
import ProductTableSearchBar from './SearchBar';
import {shallowEqual, useSelector} from 'react-redux';
import {selectListProducts} from '../selectors';
import {Table} from 'antd';
import {ColumnProps} from 'antd/es/table';
import {CommonStatus} from '../../../common/enums';
import CommonStatusLabel from '../../../common/components/CommonStatusLabel';
import ProductTableActionButtons from './ActionButtons';
import ProductTablePagination from './Pagination';
import {Product} from '../../../models/product';
import CategoryLabel from '../../category/Label';

const columns: ColumnProps<Product>[] = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Thumbnail',
        dataIndex: 'image_urls',
        key: 'image_urls',
        render: (images: string[]) => <img src={images[0]} style={{width: '50px'}} alt=""/>
    },
    {
        title: 'Tên sp',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Danh mục',
        key: 'category_id',
        dataIndex: 'category_id',
        render: (id: number) => <CategoryLabel categoryId={id} />,
    },
    {
        title: 'Tồn kho',
        key: 'quantity',
        dataIndex: 'quantity'
    },
    {
        title: 'Giá',
        key: 'price',
        dataIndex: 'price',
        render: (price: number) => price?.toLocaleString('en-US') ?? 'Liên hệ'
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
        render: (id: number) => (<ProductTableActionButtons itemId={id}/>),
    },
];

const TableDisplay = () => {
    const dataSource = useSelector(selectListProducts, shallowEqual);
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

const ProductTable = memo(() => {
    return (
        <>
            <ProductTableSearchBar/>
            <TableDisplay/>
            <ProductTablePagination/>
        </>
    );
});

export default ProductTable;
