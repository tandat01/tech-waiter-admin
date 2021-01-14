import React, {KeyboardEvent, memo} from 'react';
import {useSyncRouterQueryForm} from '../../../common/hooks';
import {userParamsChange} from '../reducer';
import {shallowEqual, useSelector} from 'react-redux';
import {selectUserListLoading, selectUserParams} from '../selectors';
import {Col, Form, Input, Row} from 'antd';
import EnumSelector from '../../../common/components/EnumSelector';
import {CommonStatus} from '../../../common/enums';

const {Search} = Input;
const {Item: FormItem} = Form;

const SearchBox = memo(({onChange}: {onChange: (changes?: any) => void}) => {
    const listLoading = useSelector(selectUserListLoading);

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

const UserTableSearchBar = () => {
    const params = useSelector(selectUserParams, shallowEqual);
    const [form, formChange] = useSyncRouterQueryForm(params, userParamsChange, ignoreSync);
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
                    <FormItem name="status">
                        <EnumSelector enumObj={CommonStatus} enumName="CommonStatus" allowClear/>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    );
};

export default UserTableSearchBar;
