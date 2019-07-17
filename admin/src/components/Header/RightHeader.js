import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Menu, Icon } from 'antd';

import './RightHeader.less';

const { SubMenu } = Menu;

const UserAvatar = () => {
    return (
        <div className="user-avatar">
            <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                style={{ width: 24, height: 24, marginRight: 10 }}
            />
            <span>管理员您好</span>
        </div>
    )
}

export default () => {
    return <div className="right-header">
        <Menu mode="horizontal">
            <SubMenu size="small" title={<UserAvatar />} >
                <Menu.Item><Icon type="user" />个人中心</Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    <Link to="/user/login">
                        <Icon type="logout" />退出
                    </Link>
                </Menu.Item>
            </SubMenu>
        </Menu>
    </div>
};