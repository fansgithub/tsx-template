import React from 'react';
import { Icon, Menu } from 'antd';
import { map } from 'lodash';
import { NavLink, withRouter } from 'react-router-dom';
import { ComponentExt } from '@utils/reactExt';
import { getCookie } from '@utils/index';
import { CONFIG_KEYS } from '@constants/index';
const SubMenu = Menu.SubMenu;

class MyMenu extends ComponentExt<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            rootSubmenuKeys: [],
            openKeys: [],
            selectedKeys: [],
            menus: [],
        };
    }

    menuOpenKey = (menus, pathname = this.props.location.pathname) => {
        let result;
        for (let i = 0; i < menus.length; i++) {
            result = this.getPathById(pathname, menus[i]);
            if (result.selectedKeys.length > 0) break;
        }
        return result;
    };

    getPathById = (url, catalog) => {
        //定义变量保存当前结果路径
        const temppath = [];
        const ids = [];
        try {
            function getNodePath(node) {
                temppath.push(node.id);
                //找到符合条件的节点，通过throw终止掉递归
                if (node.furl == url) {
                    ids.push(node.id);
                    throw 'GOT IT!';
                }
                if (Array.isArray(node.children) && node.children.length > 0) {
                    for (let i = 0; i < node.children.length; i++) {
                        getNodePath(node.children[i]);
                    }
                    //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
                    temppath.pop();
                } else {
                    //找到叶子节点时，删除路径当中的该叶子节点
                    temppath.pop();
                    throw 'NOT GOT IT!';
                }
            }
            getNodePath(catalog);
        } catch (e) {
            return {
                openKeys: temppath,
                selectedKeys: ids,
            };
        }
    };

    filterMenu = (menus) => {
        const result: any = [];
        menus.forEach((item: any) => {
            if (item.isEnabled) {
                if (Array.isArray(item.children) && item.children.length > 0) {
                    item.children = this.filterMenu(item.children);
                }
                result.push(item);
            }
        });
        return result;
    };

    componentWillMount() {
        this.api.auth
            .getFunInfoByUserName({
                userName: getCookie('username'),
            })
            .then((data) => {
                data = require('./menu.json');
                //过滤未启用的菜单，如果接口包含这部分逻辑，可以去掉
                const menus = this.filterMenu(data);
                //设置所有的一级菜单节点
                const rootSubmenuKeys = map(menus, (item) => item.id);
                this.setState({
                    menus,
                    rootSubmenuKeys,
                });
                //根据当前路径默认展开菜单
                const { openKeys, selectedKeys } = this.menuOpenKey(menus);
                this.setState({
                    selectedKeys,
                    openKeys: openKeys,
                });
            });
    }

    unListen: any = null;
    componentDidMount() {
        const { listen } = this.props.history;
        this.unListen = listen((location) => {
            const { openKeys, selectedKeys } = this.menuOpenKey(this.state.menus, location.pathname);
            this.setState({
                selectedKeys,
                openKeys: openKeys,
            });
        });
    }

    componentWillUnmount() {
        this.unListen();
    }

    renderMenu = (menus) => {
        return menus.map((menu: any) => {
            if (Array.isArray(menu.children) && menu.children.length > 0) {
                return (
                    <SubMenu
                        key={menu.id}
                        title={
                            <span>
                                {menu.imgUlr ? <Icon type={menu.imgUlr} /> : null}
                                <span>{menu.name}</span>
                            </span>
                        }>
                        {menu.children.map((subMenu) => {
                            return this.renderMenu([subMenu]);
                        })}
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.Item key={menu.id}>
                        <NavLink to={menu.furl}>
                            {menu.imgUlr ? <Icon type={menu.imgUlr} /> : null}
                            <span>{menu.name}</span>
                        </NavLink>
                    </Menu.Item>
                );
            }
        });
    };

    //点击菜单，收起其他展开菜单
    onOpenChange = (openKeys) => {
        if (CONFIG_KEYS.AUTO_COLLAPSE) {
            const latestOpenKey = openKeys.find((key) => this.state.openKeys.indexOf(key) === -1);
            if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.setState({ openKeys });
            } else {
                this.setState({
                    openKeys: latestOpenKey ? [latestOpenKey] : [],
                });
            }
        } else {
            this.setState({
                openKeys,
            });
        }
    };

    clickMenuItem = (item) => {
        this.setState({
            selectedKeys: [item.key],
        });
    };

    render() {
        const { menus } = this.state;
        if (menus.length === 0) return null;
        const dom = this.renderMenu(menus);
        return (
            <Menu
                theme={CONFIG_KEYS.MENU_THEME}
                onOpenChange={this.onOpenChange}
                openKeys={this.props.isCollapsed ? [] : this.state.openKeys}
                onClick={this.clickMenuItem}
                selectedKeys={this.state.selectedKeys}
                mode={CONFIG_KEYS.MENU_MODE}>
                {dom}
            </Menu>
        );
    }
}

export default withRouter(MyMenu);
