import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {selectAuthUser} from '../../features/auth/selectors';
import {Avatar, Button, Dropdown, Menu} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {RouterEnum} from '../../common/enums';
import LogoutManager from '../../core/auth/logout-manager';

const styles = require('./HeaderAction.module.less');

function HeaderAction() {
    const user = useSelector(selectAuthUser);

    const logout = useCallback(() => {
        LogoutManager.logout();
    }, []);

    const menuRender = (
        <Menu>
            <Menu.Item>
                <Link to={`${RouterEnum.users}${RouterEnum.edit}/${user?.id}`}>
                    {user?.username}
                </Link>
            </Menu.Item>
            <Menu.Item>
                {/*eslint-disable-next-line*/}
                <a onClick={logout}>
                    Đăng xuất
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            {
                user
                    ? (
                        <div className={styles.headerAction}>
                            <Dropdown overlay={menuRender} placement="bottomRight" trigger={['hover']}>
                                <Button className={styles.headerActionItem}>
                                    <Avatar icon={<UserOutlined/>} src={''} size={'small'} className={'mr-2'}/> {user?.username}
                                </Button>
                            </Dropdown>
                        </div>
                    )
                    : null
            }
        </>
    );
}

export default HeaderAction;
