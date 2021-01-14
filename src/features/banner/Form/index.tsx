import React from 'react';
import {useConnectedForm, useRouteParamsSynchronizer} from '../../../common/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {selectBannerFormData, selectBannerFormLoading} from '../selectors';
import {bannerFormChanged, bannerFormIdChange, submitBannerForm} from '../reducer';
import {Col, Form, Input, InputNumber, Row} from 'antd';
import EnumSelector from '../../../common/components/EnumSelector';
import {CommonStatus} from '../../../common/enums';
import SubmitButton from '../../../common/components/SubmitButton';
import FileUpload from '../../../common/components/FileUpload';

const BannerForm = () => {
    const formData = useSelector(selectBannerFormData);
    const form = useConnectedForm(formData, bannerFormChanged);
    const formId = useRouteParamsSynchronizer(bannerFormIdChange);
    const dispatch = useDispatch();
    const onFinish = () => {
        dispatch(submitBannerForm(form.getFieldsValue()));
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
                        <Col xs={24}>
                            <Form.Item
                                label="Tiêu đề"
                                name="title"
                                rules={[
                                    {required: true, message: 'Tiêu đề không được để trống'},
                                    {max: 255, message: 'Tiêu đề không thể dài quá 255 ký tự'}
                                ]}
                            >
                                <Input placeholder={'Nhập tiêu đề banner'}/>
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <Form.Item
                                label="Đường dẫn"
                                name="navigate_to"
                            >
                                <Input placeholder={'Đường link của banner'} />
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <Form.Item
                                label="Độ ưu tiên"
                                name="sort_number"
                            >
                                <InputNumber className={'w-100'} placeholder={'Số càng lớn càng được ưu tiên'}  />
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <Form.Item
                                label="Ảnh banner"
                                name="image"
                                rules={[{required: true, message: 'Ảnh banner không được để trống'}]}
                            >
                                <FileUpload valueMode={'single'}
                                            maxSize={1}
                                            data={{
                                                max_width: 2000,
                                                resolution: 1
                                            }}
                                />
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

                    <SubmitButton loadingSelector={selectBannerFormLoading} />
                </Form>
            </Col>
        </Row>
    );
};

export default BannerForm;
