import React, {useCallback} from 'react';
import {useConnectedForm, useRouteParamsSynchronizer} from '../../../common/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {selectCategoryFormData, selectCategoryFormLoading} from '../selectors';
import {categoryFormChanged, categoryFormIdChanged, submitCategoryForm} from '../reducer';
import {Col, Form, Input, InputNumber, Row} from 'antd';
import EnumSelector from '../../../common/components/EnumSelector';
import {CommonStatus} from '../../../common/enums';
import SubmitButton from '../../../common/components/SubmitButton';
import CategorySelector from '../Selector';
import {CategoryType} from '../../../models/enums/category-type';
import {CategoryFormData} from '../state';

const categoryTypeChanged = (prev: CategoryFormData, next: CategoryFormData) => prev.type !== next.type;

const CategoryTypeSelectorRender = () => {
    return (
        <Form.Item shouldUpdate={categoryTypeChanged} noStyle>
            {form =>
                <Form.Item
                    label="Danh mục cha"
                    name="parent_id"
                >
                    <CategorySelector placeholder={'Danh mục cha'}
                                      type={form.getFieldValue('type')}
                                      allowClear />
                </Form.Item>
            }
        </Form.Item>
    )
}

const CategoryForm = () => {
    const formData = useSelector(selectCategoryFormData);
    const form = useConnectedForm(formData, categoryFormChanged);
    const formId = useRouteParamsSynchronizer(categoryFormIdChanged);
    const dispatch = useDispatch();

    const onTypeChanged = useCallback(() => {
        form.setFieldsValue({
            parent_id: undefined
        });
    }, [form]);

    const onFinish = () => {
        dispatch(submitCategoryForm(form.getFieldsValue()));
    };

    return (
        <Row justify="center">
            <Col xs={24} sm={22} md={20} lg={16} xl={14} xxl={14}>
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
                                label="Tên danh mục"
                                name="name"
                                rules={[
                                    {required: true, message: 'Tên danh mục không được để trống'},
                                    {max: 150, message: 'Tên danh mục không thể dài quá 150 ký tự'}
                                    ]}
                            >
                                <Input placeholder={'Nhập tên danh mục'}/>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Loại danh mục"
                                name="type"
                                rules={[
                                    {required: true, message: 'Loại danh mục không được để trống'}
                                ]}
                            >
                                <EnumSelector enumObj={CategoryType}
                                              enumName={'CategoryType'}
                                              onChange={onTypeChanged}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <CategoryTypeSelectorRender />
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Độ ưu tiên"
                                name="sort_number"
                            >
                                <InputNumber className={'w-100'} placeholder="Số càng lớn càng được ưu tiên"  />
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

                    <SubmitButton loadingSelector={selectCategoryFormLoading} />
                </Form>
            </Col>
        </Row>
    );
};

export default CategoryForm;
