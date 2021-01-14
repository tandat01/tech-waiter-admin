import React from 'react';
import {useConnectedForm, useRouteParamsSynchronizer} from '../../../common/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {selectCustomerFormData, selectCustomerFormLoading} from '../selectors';
import {customerFormChanged, customerFormIdChange, submitCustomerForm} from '../reducer';
import { Col, Form, Input, Row } from 'antd';
import EnumSelector from '../../../common/components/EnumSelector';
import {CommonStatus} from '../../../common/enums';
import SubmitButton from '../../../common/components/SubmitButton';

const CustomerForm = () => {
    const formData = useSelector(selectCustomerFormData);
    const form = useConnectedForm(formData, customerFormChanged);
    const formId = useRouteParamsSynchronizer(customerFormIdChange);
    const dispatch = useDispatch();
    const onFinish = () => {
        dispatch(submitCustomerForm(form.getFieldsValue()));
    };

    return (
        <Row justify="center">
            <Col xs={24}>
                <Form
                    layout="vertical"
                    name="basic"
                    initialValues={formData}
                    form={form}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                >
                    <Row gutter={10}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Tên bàn"
                                name="name"
                                rules={[
                                    {required: true, message: 'Tên bàn không được để trống'},
                                    {max: 255, message: 'Tên bàn không thể dài quá 255 ký tự'}
                                ]}
                            >
                                <Input placeholder={'Nhập tên bàn, VD: Bàn 1'}/>
                            </Form.Item>
                        </Col>

                        {
                            formId
                                ? <Col xs={24} md={12}>
                                    <Form.Item
                                        label="Trạng thái"
                                        name="status"
                                    >
                                        <EnumSelector enumObj={CommonStatus} enumName="CommonStatus" />
                                    </Form.Item>
                                </Col>
                                : null
                        }
                    </Row>

                    <SubmitButton loadingSelector={selectCustomerFormLoading} />
                </Form>
            </Col>
        </Row>
    );
};

export default CustomerForm;
