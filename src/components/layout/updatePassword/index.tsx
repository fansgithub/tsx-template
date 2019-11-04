import React from 'react';
import { ComponentExt } from '@utils/reactExt';
import { withRouter } from 'react-router-dom';
import { Form, Input, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

interface IProps extends FormComponentProps {
    updatePwdModal: boolean;
    handelModal: () => void;
    hidModal: () => void;
}

class UpdatePwd extends ComponentExt<IProps> {
    constructor(props) {
        super(props);
    }

    handelModal = () => {
        this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
            if (!err) {
                const params = {
                    password: fieldsValue.password,
                    newPassword: fieldsValue.newPassword,
                };
                const { code } = await this.api.auth.updatePassword(params);
                if (code) {
                    //修改密码后，清空token，并返回到登录也页面
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 16 },
            },
        };
        const { updatePwdModal } = this.props;
        const compareToFirstPassword = (rule, value, callback) => {
            const form = this.props.form;
            if (value && value !== form.getFieldValue('newPassword')) {
                callback('两次密码输入不一致，请重新输入');
            } else {
                callback();
            }
        };
        return (
            <Modal title="修改密码" visible={updatePwdModal} onOk={this.handelModal} onCancel={this.props.hidModal}>
                <Form layout={'horizontal'} {...formItemLayout}>
                    <Form.Item label="旧密码">
                        {getFieldDecorator('password', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '旧密码不能为空',
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="新密码">
                        {getFieldDecorator('newPassword', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '新密码不能为空',
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="确认新密码">
                        {getFieldDecorator('assignPwd', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '新密码不能为空',
                                },
                                { validator: compareToFirstPassword },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(UpdatePwd) as any;
