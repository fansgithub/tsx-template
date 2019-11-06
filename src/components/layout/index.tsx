import * as React from 'react';
import { Layout } from 'antd';
import RouterAuth from '../../router/router';
import Menus from './menu/index';
import Top from './top';
import './index.less';

const { Header, Sider, Content } = Layout;

interface IProps {
    match: any;
}
interface IState {
    collapsed: boolean;
}

export default class Home extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    };

    render() {
        return (
            <Layout className="component-layout">
                <Header>
                    <Top />
                </Header>
                <Layout>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} theme="dark">
                        <Menus isCollapsed={this.state.collapsed} />
                    </Sider>
                    <Layout className="mo-parent">
                        <Content className="mo-content" id="js-page-content">
                            <RouterAuth />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
