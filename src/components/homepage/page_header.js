import React from 'react';
import { Form, Icon, Input, Button ,Row, Col, Menu, Layout } from 'antd';
import user_api from '../../api/user_api';

const { Header } = Layout;

class PageHeader extends React.Component {

  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        user_api.sign_in(values).then(res => {
          this.props.signIn(res);
        });
      }
    });
  };

  logout = e => {
    e.preventDefault();
    this.props.signOut();
  };

  render() {
    const {signed_in, user} = this.props
    console.log(user)
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Header>
        <Row>
          <Col span={6}>
            <Menu theme="dark" mode="horizontal"  defaultSelectedKeys={['1']}>
              <Menu.Item style={{height: '64px', paddingTop: '11px', fontSize: '30px'}} key="1">Funny Movie</Menu.Item>
            </Menu>
          </Col>

          { !signed_in && <Col span={18}>
            <Form 
              layout="inline"
              style={{ padding: '15px' , float: 'right'}}
              onSubmit={this.handleSubmit}>
              <Form.Item validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: ' ' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="email"
                  />,
                )}
              </Form.Item>
              <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: ' ' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Col> }
          {signed_in && <Col span={18}>
            <Col span={12}>
              <Menu 
                theme="dark"
                mode="horizontal" defaultSelectedKeys={['1']}
                style={{  float: 'right'}}>
                <Menu.Item 
                  style={{height: '64px', paddingTop: '11px'}} 
                  key="1"
                >
                  Wellcome {this.props.user["email"]}
                </Menu.Item>
              </Menu>
            </Col>
            <Col span={12}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ margin: '15px' , float: 'right'}}
              >
                Share a movie
              </Button>
    
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.logout}
                style={{ margin: '15px' , float: 'right'}}
              >
                Logout
              </Button>
            </Col>
          </Col>}
        </Row>
      </Header>
    );
  }
  
}

export default Form.create()(PageHeader);
