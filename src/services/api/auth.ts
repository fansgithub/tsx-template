import Http from 'Http';

export default {
    login(data: object): Promise<any> {
        return Http.post('oauth/token', data || {}, '/');
    },
    getFunInfoByUserName(data: object): Promise<any> {
        return Http.get('cbb-userauth/function/getFunInfoByUserName', data || {});
    },
};
