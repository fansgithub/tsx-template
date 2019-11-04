import SystemManage from '@views/systemManage';

const routerConfig: RouterConfigModel[] = [
    {
        path: '/systemManage',
        component: SystemManage,
        auth: true,
    },
];

export default routerConfig;
