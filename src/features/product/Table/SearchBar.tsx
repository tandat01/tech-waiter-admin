import React, {KeyboardEvent, memo} from 'react';
import {useSyncRouterQueryForm} from '../../../common/hooks';
import {productParamsChange} from '../reducer';
import {shallowEqual, useSelector} from 'react-redux';
import {selectProductListLoading, selectProductParams} from '../selectors';
import {Col, Form, Input, Row} from 'antd';
import EnumSelector from '../../../common/components/EnumSelector';
import {CommonStatus} from '../../../common/enums';
import CategorySelector from '../../category/Selector';
import {CategoryType} from '../../../models/enums/category-type';

const {Search} = Input;
const {Item: FormItem} = Form;

const SearchBox = memo(({onChange}: {onChange: (changes?: any) => void}) => {
    const listLoading = useSelector(selectProductListLoading);

    const onKeyUp = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            onChange();
        }
    }

    return (
        <FormItem name="search">
            <Search placeholder="Tìm kiếm"
                    loading={listLoading}
                    onKeyUp={onKeyUp}
            />
        </FormItem>
    )
});

const ignoreSync = ['search'];

const ProductTableSearchBar = () => {
    const params = useSelector(selectProductParams, shallowEqual);
    const [form, formChange] = useSyncRouterQueryForm(params, productParamsChange, ignoreSync);
    return (
        <Form form={form}
              initialValues={params}
              onValuesChange={formChange}
        >
            <Row gutter={6} className="mb-5 mt-5">
                <Col lg={6} md={12} sm={24} className="mb-2">
                    <SearchBox onChange={formChange} />
                </Col>

                <Col lg={6} md={12} sm={24} className="mb-2">
                    <FormItem name={'category'}>
                        <CategorySelector allowClear={true} type={CategoryType.PRODUCT} />
                    </FormItem>
                </Col>

                <Col lg={6} md={12} sm={24} className="mb-2">
                    <FormItem name="status">
                        <EnumSelector enumObj={CommonStatus} enumName="CommonStatus" allowClear/>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    );
};

export default ProductTableSearchBar;
