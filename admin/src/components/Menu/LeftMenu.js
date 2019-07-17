import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import './LeftMenu.less';

const { Sider } = Layout;

export default (props) => {
    const { collapsed, history } = props;

    const onSelect = ({ key }) => {
        history.push(`/studio/${key}`);
    }

    return <Sider className="left-sider" trigger={null} collapsible collapsed={collapsed} onCollapse={collapsed}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['home']} mode="inline" onSelect={onSelect}>
            <Menu.Item key="home">
                <Icon type="dashboard" />
                <span>仪表盘</span>
            </Menu.Item>
            <Menu.Item key="users">
                <Icon type="team" />
                <span>用户管理</span>
            </Menu.Item>
            <Menu.Item key="setting">
                <Icon type="setting" />
                <span>站点设置</span>
            </Menu.Item>
        </Menu>
    </Sider>
}