import React from 'react';
import {useConnectedForm, useRouteParamsSynchronizer} from '../../../common/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {selectProductFormData, selectProductFormLoading} from '../selectors';
import {productFormChanged, productFormIdChange, submitProductForm} from '../reducer';
import { Col, Form, Input, InputNumber, Row } from 'antd';
import InputPrice from '../../../common/components/InputPrice';
import EnumSelector from '../../../common/components/EnumSelector';
import {CommonStatus} from '../../../common/enums';
import SubmitButton from '../../../common/components/SubmitButton';
import CategorySelector from '../../category/Selector';
import TagSelector from '../../tag/Selector';
import FileUpload from '../../../common/components/FileUpload';
import {CategoryType} from '../../../models/enums/category-type';
import {UploadFolder} from '../../../common/enums/upload-folder';

const stateAutoCompleteOptions = [
    {value: 'Mới 100%'},
    {value: 'Mới 99%'},
    {value: 'Cũ'}
];

const ProductForm = () => {
    const formData = useSelector(selectProductFormData);
    const form = useConnectedForm(formData, productFormChanged);
    const formId = useRouteParamsSynchronizer(productFormIdChange);
    const dispatch = useDispatch();
    const onFinish = () => {
        dispatch(submitProductForm(form.getFieldsValue()));
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
                                label="Tên sản phẩm"
                                name="name"
                                rules={[
                                    {required: true, message: 'Tên sản phẩm không được để trống'},
                                    {max: 191, message: 'Tên sản phẩm không thể dài quá 191 ký tự'}
                                ]}
                            >
                                <Input placeholder={'Nhập tên sản phẩm'}/>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Danh mục"
                                name="category_id"
                                rules={[
                                    {required: true, message: 'Phải chọn một danh mục'}
                                ]}
                            >
                                <CategorySelector type={CategoryType.PRODUCT} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Tồn kho"
                                name="quantity"
                                rules={[
                                    {required: true, message: 'Số lượng tồn kho không được để trống'}
                                ]}
                            >
                                <InputNumber className={'w-100'}
                                             min={0}
                                             placeholder={'Số lượng tồn kho'}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Giá sản phẩm"
                                name="price"
                                rules={[
                                    {required: true, message: 'Giá sản phẩm không được để trống'}
                                ]}
                            >
                                <InputPrice placeholder={'Nhập giá sản phẩm'} min={0} />
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <Form.Item
                                label="Tags"
                                name="tags"
                            >
                                <TagSelector placeholder={'Tags giúp tìm kiếm sản phẩm dễ hơn'} />
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[
                                    {required: true, message: 'Mô tả sản phẩm không được để trống'},
                                    {max: 65000, message: 'Mô tả sản phẩm chỉ dài tối đa 65000 ký tự'}
                                ]}
                            >
                                <Input.TextArea placeholder="Mô tả sản phẩm"  />
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <Form.Item
                                label="Ảnh sản phẩm"
                                name="images"
                                rules={[{required: true, message: 'Ảnh sản phẩm không được để trống'}]}
                            >
                                <FileUpload valueMode={'multiple'} multiple={true} folder={UploadFolder.products} />
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

                    <SubmitButton loadingSelector={selectProductFormLoading} />
                </Form>
            </Col>
        </Row>
    );
};

export default ProductForm;
