import { StoreExt } from '@utils/reactExt';
import { COOKIE_KEYS } from '@constants/index';
import { Encrypt, setCookie } from '@utils/index';
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
                setCookie(COOKIE_KEYS.LOGIN_AUTHORIZATION, res.access_token);
                setCookie('username', params.username);
                location.href = '#/';
            }
        } catch (err) {
            console.error(err);
        }
    };
}

export default new AuthStore();
