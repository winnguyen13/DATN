import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import Logo from 'access/images/Logo.png'
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical">
                    <img className={'logo'} src={Logo} alt="" />
                </div>
                <Menu defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key={1} onClick={() => navigate("/")}><PieChartOutlined /> <span>Trang Chủ</span></Menu.Item>
                    <Menu.Item key={2} onClick={() => navigate("/course")}><PieChartOutlined /> <span>Khóa Học</span></Menu.Item>
                    <Menu.Item key={3} onClick={() => navigate("/teacher")}><PieChartOutlined /> <span>Giảng Viên</span></Menu.Item>
                    <Menu.Item key={4} onClick={() => navigate("/student")}><PieChartOutlined /> <span>Học Viên</span></Menu.Item>
                    <Menu.Item key={5} onClick={() => navigate("/document")}><PieChartOutlined /> <span>Tài Liệu</span></Menu.Item>
                    <Menu.Item key={6}><PieChartOutlined /> <span>Doanh Thu</span></Menu.Item>
                    <Menu.Item key={7}><PieChartOutlined /> <span>Lịch</span></Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '16px 16px' }}>
                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}><Outlet /></div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
