import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import map from 'lodash/map';
import routes from './routerConfig';
import NotFound from '@components/notFound';
import { getLoginStatus } from '@utils/index';

const authPath = '/login'; // 默认未登录的时候返回的页面，可以自行设置

class RouterApi extends Component<any, any> {
    renderRoute = (r, extraProps = {}, switchProps = {}) => {
        const isLogin = getLoginStatus();
        return !r.requiresAuth || isLogin ? (
            <Route
                key={r.key}
                exact={r.exact}
                path={r.path}
                render={(props) => {
                    if (r.parentKey) {
                        props.location.state = {
                            parentKey: r.parentKey,
                        };
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
    };
    //如果不需要登录、或者已经登录

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
