import { lazy } from 'react';

export default [
    {
        path: '/layout/dashboard',
        name: 'dashboard',
        exact: true,
        permissions: ['admin', 'user'],
        pageTitle: '',
        requiresAuth: true,
        component: lazy(() => import('@views/dashboard')),
        meta: {
            title: '首页',
        },
    },
];
