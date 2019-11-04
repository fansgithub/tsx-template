import { lazy } from 'react';

export default [
    {
        path: '/layout/dashboard',
        name: 'dashboard',
        exact: true,
        permissions: ['admin', 'user'],
        pageTitle: '',
        breadcrumb: [],
        requiresAuth: false,
        component: lazy(() => import('@views/dashboard')),
        meta: {
            title: '首页',
        },
    },
];
