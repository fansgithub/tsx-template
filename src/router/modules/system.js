import {lazy} from 'react';

export default [
  {
    path: '/layout/system',
    name: 'system',
    exact: true,
    permissions: [ 'admin', 'user' ],
    pageTitle: '',
    requiresAuth: true,
    meta: {
      title: '系统管理'
    },
    childRoutes: [
      {
        parentKey: '/layout/system',
        path: '/layout/system/user',
        name: 'user',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        component: lazy(() =>import('@views/system/user')),
        requiresAuth: true,
        meta: {
          title: '用户管理'
        }
      },
      {
        parentKey: '/layout/system',
        path: '/layout/system/role',
        name: 'role',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        component: lazy(() =>import('@views/system/role')),
        requiresAuth: true,
        meta: {
          title: '角色管理'
        }
      }
    ]
  }
]
