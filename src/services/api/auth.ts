import Http from 'Http';

export default {
    login(data: object): Promise<any> {
        return Http.post('auth/login', data || {});
    },
    getFunInfoByUserName(data: object): Promise<any> {
        return Http.get('auth/getFunInfoByUserName', data || {});
    },
};
