import * as React from 'react';
import { Layout } from 'antd';
import Menus from './menu';

const { Sider, Content } = Layout;
import { Redirect, Route, Switch } from 'react-router-dom';

const SystemManage = React.lazy(() => import(/* webpackChunkName: "systemManage" */ '@views/systemManage'));

interface IProps {
    match: any;
}
interface IState {
    collapsed: boolean;
    isShow: boolean;
}

export default class Admin extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            collapsed: false,
            isShow: true,
        };
    }

    toggle = (): void => {
        if (this.state.isShow) {
            this.collapsed();
        } else {
            setTimeout(this.collapsed, 50);
        }
    };

    collapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            isShow: !this.state.isShow,
        });
    };

    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    className={'layout-sider'}
                    theme="dark">
                    <div className="logo" onClick={this.toggle}>
                        <span style={{ display: this.state.isShow ? '' : 'none' }}>玛奎牙闸门自动化监控</span>
                    </div>
                    <Menus />
                </Sider>
                <Layout className="mo-parent">
                    <Content className="mo-content" id="js-page-content">
                        <Switch>
                            <Route path="/systemManage" component={SystemManage} />
                            <Redirect to="/systemManage" />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
