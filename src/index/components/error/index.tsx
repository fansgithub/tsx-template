import * as React from 'react';
import './index.less';

const Error = () => {
    return (
        <div className="error-component">
            <div className="emoji">😭</div>
            <p className="title">Ooooops!</p>
            <p>This page doesn&apost exist</p>
        </div>
    );
};

export default Error;
