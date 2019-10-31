import * as React from 'react';
import { observer } from 'mobx-react';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
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
        <div className="login-page">
            <Form onSubmit={submit} className="login-form">
                <div className="logoBox">
                    <div className="system-title">React Template</div>
                </div>
                <FormItem hasFeedback>
                    {getFieldDecorator('username', {
                        rules: [{ required: true }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="username"
                        />
                    )}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [{ required: true }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="password"
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        登录
                    </Button>
                </FormItem>
            </Form>
            <div className="copyright">© 2019 版权信息</div>
        </div>
    );
}

export default Form.create<IProps>()(observer(Login));
