import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {selectListTags, selectTagListLoading} from '../selectors';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Select} from 'antd';
import React from 'react';
import {SelectProps} from 'antd/es/select';
import { tagParamsChange } from '../reducer';

interface TagSelectorProps extends SelectProps<string> {}

const TagSelector = ({className, placeholder, onSearch, ...props}: TagSelectorProps) => {
    const tags = useSelector(selectListTags, shallowEqual);
    const loading = useSelector(selectTagListLoading);
    const [search, setSearch] = useState<string>();
    const dataSource = useMemo(() => {
        let addSearch = true;
        const source = tags.map(tag => {
            if (tag.name === search) {
                addSearch = false;
            }
            return {value: tag.name};
        });
        if (addSearch && search) {
            source.splice(0, 0, {value: search});
        }
        return source;
    }, [tags, search]);

    const dispatch = useDispatch();

    const enhanceOnSearch = useCallback((search: string) => {
        setSearch(search);
        dispatch(tagParamsChange({search}));
        onSearch?.(search);
    }, [onSearch, dispatch, setSearch]);

    useEffect(() => {
        dispatch(tagParamsChange(undefined));
    }, [dispatch])

    return (
        <Select mode="tags"
                className={className ?? 'w-100'}
                placeholder={placeholder ?? "Chọn tags"}
                loading={loading}
                onSearch={enhanceOnSearch}
                options={dataSource}
                {...props}
        />
    );
};

export default TagSelector;
