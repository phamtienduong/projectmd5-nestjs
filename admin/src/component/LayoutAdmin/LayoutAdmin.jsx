import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  FolderAddOutlined,
  CloudUploadOutlined

} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Image, Dropdown, Space, Avatar } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import App from '../../App';
import AppRouters from '../AppRouter/AppRouters';
const { Header, Sider, Content } = Layout;
export default function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate()
  const user_login = JSON.parse(localStorage.getItem("user_login"))
  const handleLogOut = ()=>{
    localStorage.removeItem("user_login")
    localStorage.removeItem("admin_token")
    navigate("/auth/admin")
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={(item) => {
            navigate(item.key)
          }}

          items={[
            {
              key: '/',
              icon: <AppstoreOutlined />,
              label: 'Dashboard',
            },
            {
              key: '/usersAdmin',
              icon: <UserOutlined />,
              label: 'Customers',
            },
            {
              key: '/productsAdmin',
              icon: <FolderAddOutlined />,
              label: 'Products',
            },
            {
              key: '/ordersAdmin',
              icon: <ShoppingCartOutlined />,
              label: 'Orders',
            },
            {
              key: '/categoryAdmin',
              icon: <CloudUploadOutlined />,
              label: 'Categorys',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className='flex justify-between mr-8'>
            <div>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </div>
            <div className='mt-2'>
              <Image
                width={80}
                src='https://theme.hstatic.net/200000549029/1000902525/14/logo.png?v=3044' />
            </div>
            <div>
              <Space>
                <div>
                  <Avatar
                    size={40}>
                    {user_login?.user_name?.charAt(0).toUpperCase()}
                    </Avatar>
                </div>
                <button className='text-xl' onClick={handleLogOut} >
                <div>
                  {user_login?.user_name}
                </div>
                </button>
              </Space>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
