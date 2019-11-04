import { observable } from 'mobx';
import { getLoginStatus } from '@utils/index';
import { StoreExt } from '@utils/reactExt';

class Store extends StoreExt {
    @observable
    isLogin: boolean = getLoginStatus();
}

export default new Store();
