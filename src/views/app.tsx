import * as React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { If } from 'tsx-control-statements/components';
import PageLoading from '@components/pageLoading';
import IntlWrapper from '@components/intlWrapper';
import RouterAuth from './routerAuth';
import HomePage from '@views/home';
import LoginPage from '@views/login';
import ErrorPage from '@components/errorPage';
import routerConfig from './routerConfig';
import './app.less';

function App() {
    return (
        <React.Suspense fallback={PageLoading}>
            <IntlWrapper>
                <div className="appWrapper">
                    <Router>
                        <Switch>
                            <Route path="/" exact component={HomePage} />
                            <Route path="/404" exact component={ErrorPage} />
                            <Route path="/login" exact component={LoginPage} />
                            <Redirect to="/login" />
                        </Switch>
                    </Router>
                </div>
            </IntlWrapper>
        </React.Suspense>
    );
}

export default App;
