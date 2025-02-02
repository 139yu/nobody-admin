import Layout from '@/layout/index.vue'

export const constantRouters = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/view/home/index.vue'),
                name: 'home',
                meta: {
                    title: '首页',
                    icon: 'HomeFilled'
                }
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/view/login/index.vue'),
        name: 'login',
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/view/404/index.vue'),
        name: '404',
        hidden: true
    }/*,
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        hidden: true
    }*/
]

export const asyncRouters = [
    {
        path: '/perms',
        component: Layout,
        name: 'perms',
        meta: {
            title: '权限管理',
            icon: 'Lock'
        },
        children: [
            {
                path: '/perms/user',
                component: () => import('@/view/perms/user/index.vue'),
                name: 'user',
                meta: {
                    title: '用户列表',
                    icon: 'User'
                }
            },
            {
                path: '/perms/role',
                component: () => import('@/view/perms/role/index.vue'),
                name: 'role',
                meta: {
                    title: '角色列表',
                    icon: 'User'
                }
            },
            {
                path: '/perms/resource',
                component: () => import('@/view/perms/resource/index.vue'),
                name: 'resource',
                meta: {
                    title: '资源列表',
                    icon: 'Star'
                }
            },
            {
                path: '/perms/resourceCategory',
                component: () => import('@/view/perms/resourceCategory/index.vue'),
                name: 'resourceCategory',
                meta: {
                    title: '资源分类',
                    icon: 'Guide'
                }
            }
        ]
    },
    {
        path: '/system',
        name:'system',
        component: Layout,
        meta: {
            title: '系统设置',
            icon: 'Setting'
        },
        children: [
            {
                path: '/system/menu',
                component: () => import('@/view/system/menu/index.vue'),
                name: 'menu',
                meta: {
                    title: '菜单列表',
                    icon: 'Monitor'
                }
            },
            {
                path: '/system/dict',
                name: 'dict',
                component: () => import('@/view/system/dict/index.vue'),
                meta: {
                    title: '数据字典',
                    icon: 'Reading'
                }
            }
        ]
    }
]
