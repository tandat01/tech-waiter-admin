import React, {memo, useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {selectListBanners} from '../selectors';
import {Table} from 'antd';
import {ColumnProps} from 'antd/es/table';
import {CommonStatus} from '../../../common/enums';
import CommonStatusLabel from '../../../common/components/CommonStatusLabel';
import BannerTableActionButtons from './ActionButtons';
import {Banner} from '../../../models/banner';
import { refreshListBanner } from '../reducer';

const columns: ColumnProps<Banner>[] = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Ảnh',
        dataIndex: 'image_url',
        key: 'image_url',
        render: (images: string) => <img src={images} style={{width: '50px'}} alt=""/>
    },
    {
        title: 'Tiêu đề',
        dataIndex: 'title',
        key: 'title',
        render: (title, record: Banner) => (<a href={record.navigate_to} rel="noreferrer" target="_blank">{title}</a>)
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
        render: (id: number) => (<BannerTableActionButtons itemId={id}/>),
    },
];

const BannerTable = memo(() => {
    const dataSource = useSelector(selectListBanners, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refreshListBanner());
    }, [dispatch]);
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
});

export default BannerTable;
