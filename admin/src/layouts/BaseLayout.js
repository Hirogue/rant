import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, Icon, BackTop } from 'antd';
import Footer from '@/components/Footer';
import RightHeader from '@/components/Header/RightHeader';
import LeftMenu from '@/components/Menu/LeftMenu';

import HomePage from '@/pages/Home/index';
import UsersPage from '@/pages/Users/index';
import SettingPage from '@/pages/Setting/index';

import './BaseLayout.less';

const { Header, Content } = Layout;

export default (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed);
    }

    return (
        <Layout id="base-layout">
            <LeftMenu collapsed={collapsed} history={props.history} />
            <Layout>
                <Header id="main-header" style={{ background: '#fff', padding: 0 }}>
                    <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={toggle}
                    />
                    <RightHeader />
                </Header>
                <Content style={{ margin: '16px' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Switch>
                            <Route path='/studio/home' component={HomePage} />
                            <Route path='/studio/users' component={UsersPage} />
                            <Route path='/studio/setting' component={SettingPage} />
                        </Switch>
                    </div>
                </Content>
                <Footer />
            </Layout>
            <BackTop />
        </Layout>
    );
}
