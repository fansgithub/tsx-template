import * as React from 'react';
import { Spin } from 'antd';
import './index.less';

function PageLoading() {
    return (
        <div className="componet-page-loading">
            <Spin className="spin" />
        </div>
    );
}

export default PageLoading;
