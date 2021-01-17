import React, {memo, useCallback, useMemo} from 'react';
import {Button, Divider, Popconfirm} from 'antd';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {deleteContactMessage, resolveContactMessage} from '../reducer';
import {useSetRecoilState} from 'recoil';
import {contactMessageDetailState} from './Detail';
import {selectSingleContactMessage} from '../selectors';

interface VehicleTableActionButtonsProps {
    itemId: number;
}

const ContactMessageTableActionButtons = memo(({itemId}: VehicleTableActionButtonsProps) => {
    const dispatch = useDispatch();
    const doDelete = () => {
        dispatch(deleteContactMessage(itemId));
    };

    const setModalState = useSetRecoilState(contactMessageDetailState);
    const selector = useMemo(() => selectSingleContactMessage(itemId), [itemId]);
    const message = useSelector(selector, shallowEqual);

    const openModal = useCallback(() => {
        setModalState(currVal => ({
            ...currVal,
            title: `Chi tiết order của khách hàng ${message?.customer?.name}`,
            modalVisible: true,
            itemId
        }));
    }, [setModalState, message, itemId, dispatch]);

    const resolveMessage = useCallback(() => {
        if (itemId) {
            dispatch(resolveContactMessage(itemId))
        }
    }, [dispatch, itemId]);

    return (
        <>

            <Button type={'link'} className={'color-primary p-0'} onClick={openModal}>
                Chi tiết
            </Button>

            <Divider type={'vertical'} />

            <Popconfirm title={`Bạn chắc chắn order này đã thanh toán chứ?`}
                        onConfirm={resolveMessage}
                        placement={'topRight'}>
                <Button type={'link'} className={'color-warning p-0'}>
                    Thanh toán
                </Button>
            </Popconfirm>

            {/*<Divider type={'vertical'} />*/}

            {/*<Popconfirm title={`Bạn chắc chắn muốn hủy đơn này chứ?`}*/}
            {/*            onConfirm={doDelete}*/}
            {/*            placement={'topRight'}>*/}
            {/*    <Button type={'link'} className={'color-danger p-0'}>*/}
            {/*        Xóa*/}
            {/*    </Button>*/}
            {/*</Popconfirm>*/}
        </>
    );
});

export default ContactMessageTableActionButtons;
