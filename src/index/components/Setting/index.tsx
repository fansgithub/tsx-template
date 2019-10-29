import React from 'react';
import store from './store'
import {observer} from 'mobx-react'
console.log(store)

@observer
export default class Setting extends React.Component{
    render(){
        return <div>系统管理</div>
    }
}