import http from '../index';

export default {
    login(data: object): Promise<any> {
        return http.post('auth/login', data || {});
    },
};
