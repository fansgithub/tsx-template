import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

interface Iprops {
    children: any;
    location: any;
    isLogin: boolean;
    history: any;
}

class CheckLoginStatus extends Component<Iprops> {
    componentDidMount() {
        if (!this.props.isLogin) {
            setTimeout(() => {
                this.props.history.push('/login');
            }, 300);
        }
        if (this.props.isLogin && this.props.location.pathname === '/login') {
            setTimeout(() => {
                this.props.history.push('/');
            }, 300);
        }
        console.log(this.props, 'login');
    }

    componentDidUpdate() {
        if (!this.props.isLogin) {
            setTimeout(() => {
                this.props.history.push('/login');
            }, 300);
        }
    }
    render() {
        return this.props.children;
    }
}

const CheckLoginStatusWrapper: any = withRouter(CheckLoginStatus as any);

export default CheckLoginStatusWrapper;
