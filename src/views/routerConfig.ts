import HomePage from '@views/home';
import LoginPage from '@views/login';
import ErrorPage from '@components/errorPage';

const routerConfig: RouterConfigModel[] = [
    {
        path: '/',
        component: HomePage,
        auth: true,
    },
    {
        path: '/login',
        component: LoginPage,
    },
    {
        path: '/404',
        component: ErrorPage,
    },
];

export default routerConfig;
