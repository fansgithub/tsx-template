import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '@views/app';
import './index.less';

if (module.hot) {
    module.hot.accept();
}
ReactDOM.render(<App />, document.getElementById('root'));
