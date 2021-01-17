import {useSyncRouterQueryForm} from '../../../common/hooks';
import React, {KeyboardEvent, memo} from 'react';
import {contactMessageParamsChange} from '../reducer';
import {shallowEqual, useSelector} from 'react-redux';
import {selectContactMessageListLoading, selectContactMessageParams} from '../selectors';
import {Col, Form, Input, Row, Radio} from 'antd';
import EnumSelector from '../../../common/components/EnumSelector';
import {ContactMessageStatus} from '../../../models/enums/contact-message-status';

const {Search} = Input;
const {Item: FormItem} = Form;

const SearchBox = memo(({onChange}: {onChange: (changes?: any) => void}) => {
    const listLoading = useSelector(selectContactMessageListLoading);

    const onKeyUp = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            onChange();
        }
    };

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

const ContactMessageTableSearchBar = () => {
    const params = useSelector(selectContactMessageParams, shallowEqual);
    const [form, formChange] = useSyncRouterQueryForm(params, contactMessageParamsChange, ignoreSync);
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
                        <EnumSelector enumObj={ContactMessageStatus}
                                      enumName="ContactMessageStatus"
                                      allowClear/>
                    </FormItem>
                </Col>

                <Col lg={6} md={12} sm={24} className="mb-2">
                    <FormItem name={'read'}>
                        <Radio.Group>
                            <Radio value={undefined}>Tất cả</Radio>
                            <Radio value={true}>Đã đọc</Radio>
                            <Radio value={false}>Chưa đọc</Radio>
                        </Radio.Group>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    );
};

export default ContactMessageTableSearchBar;
