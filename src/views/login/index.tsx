import * as React from 'react';
import { observer } from 'mobx-react';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { CONFIG_KEYS } from '@constants/index';
import loginStore from './store';
import './index.less';

const FormItem = Form.Item;

interface IProps extends FormComponentProps {}

function Login({ form }: IProps) {
    const [loading, setLoading] = React.useState(false);

    const submit = (e: React.FormEvent<any>): void => {
        e.preventDefault();
        form.validateFields(
            async (err, values): Promise<any> => {
                if (!err) {
                    setLoading(true);
                    try {
                        await loginStore.login(values);
                    } finally {
                        setLoading(false);
                    }
                }
            }
        );
    };

    const { getFieldDecorator } = form;
    return (
        <div className="login">
            <Form onSubmit={submit} className="login-form">
                <div className="logoBox">
                    <h2 className="title">{CONFIG_KEYS.SYSTEM_NAME}</h2>
                </div>
                <FormItem hasFeedback>
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: '用户名不能为空',
                            },
                        ],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入用户名"
                        />
                    )}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请输入密码"
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        登录
                    </Button>
                </FormItem>
            </Form>
            <div className="copyright">© 请修改此处的版权信息文字</div>
        </div>
    );
}

export default Form.create<IProps>()(observer(Login));
