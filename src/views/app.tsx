import * as React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import PageLoading from '@components/pageLoading';
import Intl from '@components/intlWrapper';
import Layout from '@components/layout';
import LoginPage from '@views/login';
import NotFound from '@components/notFound';
import store from '@store/app';
import { CONFIG_KEYS } from '@constants/index';
import './app.less';

const IntlWrapper = CONFIG_KEYS.ENABLE_INTL ? Intl : React.Fragment;

@observer
class App extends React.Component {
    render() {
        return (
            <React.Suspense fallback={<PageLoading />}>
                <IntlWrapper>
                    <div className="appWrapper">
                        <Router>
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    render={() => {
                                        if (store.isLogin) {
                                            return <Redirect to="/layout/dashboard" push />;
                                        } else {
                                            return <Redirect to="/login" push />;
                                        }
                                    }}
                                />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/layout" component={Layout} />
                                <Route component={NotFound} />
                            </Switch>
                        </Router>
                    </div>
                </IntlWrapper>
            </React.Suspense>
        );
    }
}

export default App;
