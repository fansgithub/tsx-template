import React, { Component, Fragment } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import UpdatePassword from '../updatePassword';
import { CONFIG_KEYS } from '@constants/index';
import { getCookie } from '@utils/index';

interface IState {
    updatePwdModal: boolean;
}

class Header extends Component<any, IState> {
    constructor(props) {
        super(props);
        this.state = {
            updatePwdModal: false,
        };
    }

    handleMenuClick = ({ key }) => {
        switch (key) {
            case 'editPwd':
                this.setState({
                    updatePwdModal: true,
                });
                break;
            default:
                this.logOut();
                break;
        }
    };

    logOut = async () => {};

    handelModal = () => {
        this.setState({
            updatePwdModal: false,
        });
    };

    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="editPwd">修改密码</Menu.Item>
                <Menu.Item key="signOut">退出登录</Menu.Item>
            </Menu>
        );
        const { updatePwdModal } = this.state;
        return (
            <Fragment>
                <div className="header-title">
                    <p></p>
                    <span>{CONFIG_KEYS.SYSTEM_NAME}</span>
                </div>
                <div className="header-right">
                    <Dropdown overlay={menu} placement="bottomCenter" overlayStyle={{ top: 66 }}>
                        <a className="ant-dropdown-link" href="javascript:void(0)">
                            欢迎您，{getCookie('username')}
                            <Icon type="down" />
                        </a>
                    </Dropdown>
                </div>
                <UpdatePassword
                    updatePwdModal={updatePwdModal}
                    handelModal={this.handelModal}
                    hidModal={this.handelModal}
                />
            </Fragment>
        );
    }
}

export default Header;
