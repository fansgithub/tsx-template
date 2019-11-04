import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import map from 'lodash/map';
import routes from './routerConfig';
import NotFound from '@components/errorPage';
import { getLoginStatus } from '@utils/index';

const isLogin = getLoginStatus();
const authPath = '/login'; // 默认未登录的时候返回的页面，可以自行设置

class RouterApi extends Component<any, any> {
    renderRoute = (r, extraProps = {}, switchProps = {}) =>
        !r.requiresAuth || isLogin || r.path === authPath ? (
            <Route
                key={r.key}
                exact={r.exact}
                path={r.path}
                render={(props) => {
                    const { search } = props.location;
                    if (r.parentKey) {
                        //props.location.parentKey = r.parentKey
                    }

                    return <r.component {...props} r={r} />;
                }}
            />
        ) : (
            <Redirect
                key={r.path}
                to={{
                    pathname: authPath,
                    state: { from: this.props.location },
                }}
            />
        );
    /**
     * Recursive routing
     * 递归路由
     * @param routes
     * @returns {*}
     */
    mapRoutes = (routeList) => {
        return map(routeList, (r) => {
            if (r.childRoutes && r.childRoutes.length > 0) {
                return this.mapRoutes(r.childRoutes);
            } else {
                return this.renderRoute(r);
            }
        });
    };
    render() {
        return (
            <Switch location={this.props.location}>
                {this.mapRoutes(routes)}
                <Route component={NotFound} />
            </Switch>
        );
    }
}

export default withRouter(RouterApi);
