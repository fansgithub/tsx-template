import http from '../index';

export default {
    getUsers(data: object): Promise<any> {
        return http.get('user', data || {});
    },

    createUser(data: object): Promise<any> {
        return http.post('user/create', data || {});
    },

    modifyUser(data: object): Promise<any> {
        return http.put('user/modify', data || {});
    },

    deleteUser(data: object): Promise<any> {
        return http.delete('user/delete', data || {});
    },
};
