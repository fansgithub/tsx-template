import React from 'react';
import { Icon, Menu } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import { ComponentExt } from '@utils/reactExt';
const SubMenu = Menu.SubMenu;
const rootSubmenuKeys: any = [];

class MyMenu extends ComponentExt<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: [],
            selectedKeys: [],
            menus: [],
        };
    }

    unListen: any = null;

    componentDidMount() {
        const { listen } = this.props.history;
        this.unListen = listen((location) => {
            const hash = '#' + location.pathname;
            const selectedKeys: any = [];
            const openKeys: any = [];
            this.state.menus.forEach((menu) => {
                if (Array.isArray(menu.children)) {
                    menu.children.forEach((subMenu) => {
                        if (pathToRegexp('#/' + subMenu.furl).test(hash)) {
                            selectedKeys.push(subMenu.id);
                            openKeys.push(menu.id);
                        }
                    });
                } else {
                    if (hash.indexOf(menu.furl) !== -1) {
                        selectedKeys.push(menu.id);
                        openKeys.push(menu.id);
                    }
                }
            });
            this.setState({
                selectedKeys,
                openKeys,
            });
        });
    }

    componentWillUnmount() {
        this.unListen();
    }

    componentWillMount() {
        this.api.auth
            .getFunInfoByUserName({
                userName: sessionStorage.getItem('username'),
            })
            .then((data) => {
                //默认选中菜单的逻辑
                const menus = this.filterMenu(data);
                menus.forEach((item) => {
                    rootSubmenuKeys.push(item.id);
                });
                const hash = location.hash;
                const openKeys: string[] = [];
                const selectedKeys: string[] = [];
                menus.forEach((menu) => {
                    if (Array.isArray(menu.children)) {
                        menu.children.forEach((subMenu) => {
                            if (pathToRegexp('#/' + subMenu.furl).test(hash)) {
                                selectedKeys.push(subMenu.id);
                                openKeys.push(menu.id);
                            }
                        });
                    } else {
                        if (hash.indexOf(menu.furl) !== -1) {
                            selectedKeys.push(menu.id);
                            openKeys.push(menu.id);
                        }
                    }
                });
                this.setState({
                    menus,
                    openKeys,
                    selectedKeys,
                });
            });
    }

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
                        <NavLink to={`/${menu.furl}`}>
                            {menu.imgUlr ? <Icon type={menu.imgUlr} /> : null}
                            <span>{menu.name}</span>
                        </NavLink>
                    </Menu.Item>
                );
            }
        });
    };

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find((key) => this.state.openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
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
                style={{
                    height: 'calc(100vh - 66px)',
                    borderRight: 0,
                    overflow: 'auto',
                    paddingBottom: '48px',
                }}
                theme="dark"
                onOpenChange={this.onOpenChange}
                openKeys={this.state.openKeys}
                onClick={this.clickMenuItem}
                selectedKeys={this.state.selectedKeys}
                mode="inline">
                {dom}
            </Menu>
        );
    }
}

export default withRouter(MyMenu);
