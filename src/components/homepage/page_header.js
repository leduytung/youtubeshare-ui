import React, { useState, useEffect } from 'react';
import { Form, Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Layout, Menu, Col, Row } from 'antd';
import user_api from '../../api/user_api';

const { Header } = Layout;

function PageHeader() {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = values => {
    user_api.sign_in(values).then(res => {
      console.log('Signin:', res.data);
    });
  };

  return (
    <Header>
      <Row>
        <Col span={6}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Funny Movie</Menu.Item>
          </Menu>
        </Col>

        <Col span={18}>
          <Form 
            form={form} 
            name="horizontal_login" 
            layout="inline" 
            style={{ padding: '15px' , float: 'right'}}
            onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: ' ' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: ' ' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Log in / Register
                </Button>
              )}
            </Form.Item>
          </Form>
        </Col>
        
        {/* <Col span={12}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}
            style={{  float: 'right'}}>
              <Menu.Item key="1">Wellcome xxx</Menu.Item>
            </Menu>
          </Col>
        <Col span={6}>
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
            style={{ margin: '15px' , float: 'right'}}
          >
            Logout
          </Button>
        </Col> */}
      </Row>
    </Header>
  );
}

export default PageHeader;
