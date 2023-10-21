import React from 'react';
import { Col, Row, theme, Form, Input, Button } from 'antd';
import LogoLogin from 'access/images/7522174.png';
import Logo from 'access/images/Logo.png';
import { PageWrapper } from 'pages/Login/Login.styled';
import { useNavigate } from "react-router-dom";
const Register = () => {
    const navigate = useNavigate();
    return <PageWrapper>
        <Row gutter={[0, 0]} className={'row-1'}>
            <Col span={12} className={'box-left'}>
                <img className={'bg-1'} src={LogoLogin} alt="" />
                <img className={'bg-2'} src={LogoLogin} alt="" />
            </Col>
            <Col span={10} className={'content-login'}>
                <div>
                    <img className={'logo'} src={Logo} alt="" />
                    <h2 className='title-login'>ĐĂNG KÍ</h2>
                    <Form
                        name="basic"
                        layout={'vertical'}
                        style={{ maxWidth: 600 }}
                        autoComplete="off"
                    >
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}>
                            <Input placeholder='Email của bạn' />
                        </Form.Item>
                        <Form.Item
                            label="Tên đăng nhập:"
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập của bạn!' }]}
                        >
                            <Input placeholder='Tên đăng nhập của bạn' />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
                        >
                            <Input.Password placeholder='Mật khẩu của bạn' />
                        </Form.Item>
                        <Form.Item
                            label="Xác nhận mật khẩu"
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Vui lòng nhập xác nhận mật khẩu của bạn!' }]}
                        >
                            <Input.Password placeholder='Xác nhận mật khẩu' />
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                ĐĂNG KÍ
                            </Button>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 24 }} style={{ fontWeight: 400, fontSize: '16px', display: 'flex', justifyContent: 'center' }}>
                            <span style={{ color: '#7D7D7D' }}>Đã có tài khoản ? </span> <span style={{ color: '#000000', cursor: 'pointer' }} onClick={() => navigate("/login")}>Đăng Nhập</span>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    </PageWrapper>
}
export default Register;