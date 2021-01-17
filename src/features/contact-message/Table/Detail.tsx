import {Button, Descriptions, Modal, Table} from 'antd';
import React, {memo, useCallback, useMemo} from 'react';
import {atom, useRecoilState} from 'recoil';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {deleteContactMessage, resolveContactMessage} from '../reducer';
import {selectInteractingStateOfMessage, selectSingleContactMessage} from '../selectors';
import {CheckOutlined, CloseOutlined, DeleteOutlined} from '@ant-design/icons';
import {ContactMessageStatus} from '../../../models/enums/contact-message-status';
import {Link} from 'react-router-dom';
import {RouterEnum} from '../../../common/enums';
import {ColumnProps} from 'antd/es/table';
import {ContactMessage} from '../../../models/contact-message';
import {Customer} from '../../../models/customer';
import StatusLabel from '../../../common/components/StatusLabel';
import ContactMessageTableActionButtons from './ActionButtons';
import {OrderDetail} from '../../../models/order-detail';
import {Product} from '../../../models/product';

export interface ContactMessageDetailState {
    modalVisible: boolean;
    itemId?: number;
    title?: string;
}

interface DetailRenderProps {
    itemId?: number;
}

export const contactMessageDetailState = atom<ContactMessageDetailState>({
    key: 'contactMessageDetailState$',
    default: {
        itemId: undefined,
        modalVisible: false,
    }
});

const columns: ColumnProps<OrderDetail>[] = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Món',
        dataIndex: 'product',
        key: 'product',
        render: (product?: Product) =>
            <Link to={`${RouterEnum.products}${RouterEnum.edit}/${product?.id}`}>
                {product?.name}
            </Link>
    },
    {
        title: 'Đơn giá',
        dataIndex: 'unit_price',
        key: 'unit_price',
        render: (price: number) => price.toLocaleString('en-US')
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Thành tiền',
        dataIndex: 'unit_price',
        key: 'unit_price',
        render: (price: number, item) => (price * item.quantity).toLocaleString('en-US')
    },
];

const DetailRender = ({itemId}: DetailRenderProps) => {
    const selector = useMemo(() => selectSingleContactMessage(itemId ?? 0), [itemId]);
    const message = useSelector(selector, shallowEqual);

    const dataSource = useMemo(() => message?.order_details, [message])

    return (
        <>
            <Descriptions title={message?.customer?.name}>
                <Descriptions.Item label="Yêu cầu lúc">{message?.created_at}</Descriptions.Item>
                <Descriptions.Item label="Tổng hóa đơn">{message?.total_price?.toLocaleString('en-US')}</Descriptions.Item>
            </Descriptions>

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
        </>
    )
};

const ContactMessageFooter = memo(() => {
    const [{itemId}, setState] = useRecoilState(contactMessageDetailState);
    const dispatch = useDispatch();
    const handleCancel = useCallback(() => {
        setState(currVal => ({
            ...currVal,
            modalVisible: false
        }));
    }, [setState]);

    const handleOk = useCallback(() => {
        if (itemId) {
            dispatch(resolveContactMessage(itemId))
        }
    }, [dispatch, itemId]);

    const handleDelete = useCallback(() => {
        if (itemId) {
            dispatch(deleteContactMessage(itemId))
        }
    }, [dispatch, itemId]);

    const interacting = useSelector(selectInteractingStateOfMessage(itemId));
    const item = useSelector(selectSingleContactMessage(itemId ?? 0));

    return (
        <>
            <Button type={'primary'}
                    onClick={handleOk}
                    loading={interacting}
                    disabled={item?.status !== ContactMessageStatus.WAITING}
            ><CheckOutlined/> Thanh toán</Button>
            {/*<Button type={'danger' as any}*/}
            {/*        onClick={handleDelete}*/}
            {/*        loading={interacting}*/}
            {/*        disabled={item?.status !== ContactMessageStatus.WAITING}*/}
            {/*><DeleteOutlined/> Xóa</Button>*/}
            <Button type={'default'}
                    onClick={handleCancel}
            >
                <CloseOutlined/> Đóng</Button>
        </>
    );
});

const ContactMessageDetail = memo(() => {
    const [{modalVisible, itemId, title}, setState] = useRecoilState(contactMessageDetailState);

    const handleCancel = useCallback(() => {
        setState(currVal => ({
            ...currVal,
            modalVisible: false
        }));
    }, [setState]);

    return (
        <Modal title={title}
               visible={modalVisible}
               footer={<ContactMessageFooter/>}
               className="large-modal"
               onCancel={handleCancel}
        >
            <DetailRender itemId={itemId}/>
        </Modal>
    );
});

export default ContactMessageDetail;

