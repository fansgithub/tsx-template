import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout, Menu, ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import './App.less';

const Setting = React.lazy(() => import(/* webpackChunkName: "setting" */ './Setting'))

const { Header, Content, Footer } = Layout;

const App = ({ match }: any) => {
  let defaultKey = match.url.replace('/', '') || 'employee';
  return <ConfigProvider locale={zh_CN}>
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[defaultKey]}
          className="menu"
        >
          <Menu.Item key="setting"><Link to="/setting">系统设置</Link></Menu.Item>
        </Menu>
      </Header>
      <Content className="contentWrap">
        <div className="content">
          <Route path="/setting" component={Setting} />
        </div>
      </Content>
      <Footer className="footer">TypeScript in Action</Footer>
    </Layout>
  </ConfigProvider>
}

export default App;
