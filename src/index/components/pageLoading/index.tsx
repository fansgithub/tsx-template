import * as React from 'react';
import { Spin } from 'antd';
import './index.less';

function PageLoading() {
    return (
        <div className="page-loading-component">
            <Spin className="spin" />
        </div>
    );
}

export default PageLoading;
