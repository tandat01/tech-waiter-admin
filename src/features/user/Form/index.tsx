import React, {memo} from 'react';
import {useConnectedForm, useRouteParamsSynchronizer} from '../../../common/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserFormData, selectUserFormLoading} from '../selectors';
import {userFormChanged, userFormIdChange, submitUserForm} from '../reducer';
import { Col, Form, Input, Row } from 'antd';
import EnumSelector from '../../../common/components/EnumSelector';
import {CommonStatus} from '../../../common/enums';
import SubmitButton from '../../../common/components/SubmitButton';

const UserForm = memo(() => {
    const formData = useSelector(selectUserFormData);
    const form = useConnectedForm(formData, userFormChanged);
    const formId = useRouteParamsSynchronizer(userFormIdChange);
    const dispatch = useDispatch();
    const onFinish = () => {
        dispatch(submitUserForm(form.getFieldsValue()));
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
                                label="Tài khoản"
                                name="username"
                                rules={[
                                    {required: true, message: 'Tên tài khoản không thể để trống'},
                                    {max: 191, message: 'Tên tài khoản không thể dài quá 191 ký tự'}
                                ]}
                            >
                                <Input placeholder={'Nhập tên tài khoản'} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {required: !formId, message: 'Mật khẩu không thể để trống'},
                                    {max: 50, min: 4, message: 'Mật khẩu phải dài từ 4-50 ký tự'}
                                ]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Tên"
                                name="name"
                                rules={[{required: true, message: 'Tên không được để trống'}]}
                            >
                                <Input placeholder={'Nhập tên của người dùng'} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {required: true, message: 'Email không thể để trống'},
                                    {max: 191, message: 'Email chỉ dài tối đa 191 ký tự'},
                                    {pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: 'Email không đúng định dạng'}
                                ]}
                            >
                                <Input placeholder={'Email không được để trống'} />
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

                    <SubmitButton loadingSelector={selectUserFormLoading} />
                </Form>
            </Col>
        </Row>
    );
});

export default UserForm;
