import { StoreExt } from '@utils/reactExt';
import { LOGIN_AUTHORIZATION } from '@constants/index';
import { Encrypt } from '@utils/index';
import appStore from '@store/app';
class AuthStore extends StoreExt {
    login = async (params): Promise<any> => {
        try {
            params.grant_type = 'password';
            params.server = 'server';
            params.client_id = 'summit';
            params.client_secret = 'summit';
            params.password = Encrypt(params.password);
            const res = await this.api.auth.login(params);
            if (res) {
                appStore.isLogin = true;
                sessionStorage.setItem(LOGIN_AUTHORIZATION, res.access_token);
                sessionStorage.setItem('username', params.username);
                location.href = '#/';
            }
        } catch (err) {
            console.error(err);
        }
    };
}

export default new AuthStore();
