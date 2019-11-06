import { lazy } from 'react';

export default [
    {
        path: '/login',
        name: 'login',
        exact: true,
        permissions: ['admin', 'user'],
        pageTitle: '',
        requiresAuth: false,
        component: lazy(() => import('@views/login')),
        meta: {
            title: '登录页',
        },
    },
    {
        path: '/notFound',
        name: 'NotFound',
        exact: true,
        permissions: ['admin', 'user'],
        pageTitle: '',
        requiresAuth: false,
        component: lazy(() => import('@views/notFound')),
        meta: {
            title: '404',
        },
    },
];
