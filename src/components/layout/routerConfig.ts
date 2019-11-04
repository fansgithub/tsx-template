import SystemManage from '@views/systemManage';
import Dashboard from '@views/dashboard';

const routerConfig: RouterConfigModel[] = [
    {
        path: '/layout/systemManage',
        component: SystemManage,
        auth: true,
    },
    {
        path: '/layout/dashboard',
        component: Dashboard,
        auth: true,
    },
];

export default routerConfig;
