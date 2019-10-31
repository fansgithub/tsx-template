import { StoreExt } from '@utils/reactExt';

class AuthStore extends StoreExt {
    login = async (params): Promise<any> => {
        try {
            const res = await this.api.auth.login(params);
            if (res) {
                location.href = '#/home';
            }
        } catch (err) {
            console.error(err);
        }
    };
}

export default new AuthStore();
