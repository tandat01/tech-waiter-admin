import {MenuType, Routes} from './core/router';
import WithSidebarLayout from './layouts/with-sidebar-layout';
import {lazy} from 'react';
import {
    CarOutlined,
    DashboardOutlined,
    DollarOutlined,
    OrderedListOutlined,
    UserOutlined,
    UserSwitchOutlined
} from '@ant-design/icons';
import MiddleContentLayout from './layouts/middle-content-layout';
import {RouterEnum} from './common/enums';

const {create, edit, list} = RouterEnum;

const appRoutes: Routes = [
    {
        path: '/auth',
        component: MiddleContentLayout,
        children: [
            {
                path: '/auth/login',
                component: lazy(() => import('./features/auth/login')),
                data: {
                    title: 'Đăng nhập',
                    menuDisplay: false,
                }
            }
        ]
    },
    {
        path: '/',
        component: WithSidebarLayout,
        data: {
            menuType: MenuType.NONE
        },
        children: [
            {
                path: RouterEnum.dashboard,
                component: lazy(() => import('./features/dashboard')),
                data: {
                    title: 'Dashboard',
                    menuType: MenuType.ITEM,
                    menuDisplay: true,
                    icon: DashboardOutlined
                }
            },
            {
                path: RouterEnum.orders,
                data: {
                    title: 'Quản lý đơn',
                    menuType: MenuType.SUBMENU,
                    menuDisplay: true,
                    icon: DollarOutlined
                },
                children: [
                    {
                        path: `${RouterEnum.orders}${list}`,
                        component: lazy(() => import('./features/contact-message/Table')),
                        data: {
                            title: 'DS Order',
                            menuDisplay: true
                        }
                    }
                ]
            },
            {
                path: RouterEnum.categories,
                data: {
                    title: 'Quản lý danh mục',
                    menuType: MenuType.SUBMENU,
                    menuDisplay: true,
                    icon: OrderedListOutlined
                },
                children: [
                    {
                        path: `${RouterEnum.categories}${list}`,
                        component: lazy(() => import('./features/category/Table')),
                        data: {
                            title: 'Danh mục',
                            menuDisplay: true,
                            navigateButtons: {
                                navigate: `${RouterEnum.categories}${create}`,
                                title: 'Thêm danh mục'
                            }
                        }
                    },
                    {
                        path: `${RouterEnum.categories}${create}`,
                        component: lazy(() => import('./features/category/Form')),
                        data: {
                            title: 'Tạo danh mục',
                            menuDisplay: true
                        }
                    },
                    {
                        path: `${RouterEnum.categories}${edit}/:id`,
                        component: lazy(() => import('./features/category/Form')),
                        data: {
                            title: 'Sửa danh mục',
                            menuDisplay: false
                        }
                    }
                ]
            },
            {
                path: RouterEnum.products,
                data: {
                    title: 'Quản lý sản phẩm',
                    menuType: MenuType.SUBMENU,
                    icon: CarOutlined,
                    menuDisplay: true
                },
                children: [
                    {
                        path: `${RouterEnum.products}${list}`,
                        component: lazy(() => import('./features/product/Table')),
                        data: {
                            title: 'DS Sản phẩm',
                            menuType: MenuType.ITEM,
                            menuDisplay: true,
                            navigateButtons: {
                                navigate: `${RouterEnum.products}${create}`,
                                title: 'Thêm sản phẩm'
                            }
                        }
                    },
                    {
                        path: `${RouterEnum.products}${create}`,
                        component: lazy(() => import('./features/product/Form')),
                        data: {
                            title: 'Thêm sản phẩm',
                            menuType: MenuType.ITEM,
                            menuDisplay: true,
                        }
                    },
                    {
                        path: `${RouterEnum.products}${edit}/:id`,
                        component: lazy(() => import('./features/product/Form')),
                        data: {
                            title: 'Sửa sản phẩm',
                            menuType: MenuType.ITEM,
                            menuDisplay: false,
                        }
                    },
                ]
            },
            {
                path: RouterEnum.customers,
                data: {
                    title: 'Quản lý bàn',
                    menuType: MenuType.SUBMENU,
                    icon: UserSwitchOutlined,
                    menuDisplay: true
                },
                children: [
                    {
                        path: `${RouterEnum.customers}${list}`,
                        component: lazy(() => import('./features/customer/Table')),
                        data: {
                            title: 'DS bàn',
                            menuType: MenuType.ITEM,
                            menuDisplay: true,
                            navigateButtons: {
                                navigate: `${RouterEnum.customers}${create}`,
                                title: 'Thêm bàn'
                            }
                        }
                    },
                    {
                        path: `${RouterEnum.customers}${create}`,
                        component: lazy(() => import('./features/customer/Form')),
                        data: {
                            title: 'Thêm bàn',
                            menuType: MenuType.ITEM,
                            menuDisplay: true,
                        }
                    },
                    {
                        path: `${RouterEnum.customers}${edit}/:id`,
                        component: lazy(() => import('./features/customer/Form')),
                        data: {
                            title: 'Sửa thông tin bàn',
                            menuType: MenuType.ITEM,
                            menuDisplay: false,
                        }
                    },
                ]
            },

            {
                path: RouterEnum.users,
                data: {
                    title: 'Quản lý tài khoản',
                    menuType: MenuType.SUBMENU,
                    icon: UserOutlined,
                    menuDisplay: true
                },
                children: [
                    {
                        path: `${RouterEnum.users}${list}`,
                        component: lazy(() => import('./features/user/Table')),
                        data: {
                            title: 'DS Tài khoản',
                            menuType: MenuType.ITEM,
                            menuDisplay: true,
                            navigateButtons: {
                                navigate: `${RouterEnum.users}${create}`,
                                title: 'Thêm tài khoản'
                            }
                        }
                    },
                    {
                        path: `${RouterEnum.users}${create}`,
                        component: lazy(() => import('./features/user/Form')),
                        data: {
                            title: 'Thêm tài khoản',
                            menuType: MenuType.ITEM,
                            menuDisplay: true,
                        }
                    },
                    {
                        path: `${RouterEnum.users}${edit}/:id`,
                        component: lazy(() => import('./features/user/Form')),
                        data: {
                            title: 'Sửa tài khoản',
                            menuType: MenuType.ITEM,
                            menuDisplay: false,
                        }
                    },
                ]
            },

            {
                path: '/',
                redirectTo: RouterEnum.dashboard
            }
        ]
    },
];

export default appRoutes;
