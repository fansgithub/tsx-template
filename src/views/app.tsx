import * as React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PageLoading from '@components/pageLoading';
import IntlWrapper from '@components/intlWrapper';
import Layout from '@components/layout';
import LoginPage from '@views/login';
import ErrorPage from '@components/notFound';
import { getLoginStatus } from '@utils/index';
import CheckLogin from './checkLoginStatus';
import './app.less';

const authPath = '/login';

function App() {
    console.log('app render');
    const isLogin = getLoginStatus();
    return (
        <React.Suspense fallback={PageLoading}>
            <IntlWrapper>
                <div className="appWrapper">
                    <Router>
                        <CheckLogin isLogin={true}>
                            <Switch>
                                <Route exact path="/" render={() => <Redirect to="/layout/dashboard" push />} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/layout" component={Layout} />
                                <Route component={ErrorPage} />
                            </Switch>
                        </CheckLogin>
                    </Router>
                </div>
            </IntlWrapper>
        </React.Suspense>
    );
}

export default App;
