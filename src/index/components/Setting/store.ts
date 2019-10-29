import { observable } from 'mobx'
class Store {
    @observable
    name = ''
}
export default new Store()