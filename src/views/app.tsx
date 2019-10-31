import * as React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import PageLoading from '@components/PageLoading';
import Error from '@components/Error';
import IntlWrapper from '@components/intlWrapper';
import './app.less';

const Home = React.lazy(() => import(/* webpackChunkName: "home" */ '@views/home'));
const Login = React.lazy(() => import(/* webpackChunkName: "login" */ '@views/login'));

function App() {
    return (
        <React.Suspense fallback={PageLoading}>
            <IntlWrapper>
                <div className="appWrapper">
                    <Router>
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route path="/" component={Home} />
                            <Route component={Error} />
                        </Switch>
                    </Router>
                </div>
            </IntlWrapper>
        </React.Suspense>
    );
}

export default App;
