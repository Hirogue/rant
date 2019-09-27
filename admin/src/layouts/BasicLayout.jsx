import RightContent from '@/components/GlobalHeader/RightContent';
import BlankLayout from '@/layouts/BlankLayout';
import { canReadAny, canReadOwn } from '@/utils/access-control';
import { getUserInfo } from '@/utils/global';
import ProLayout from '@ant-design/pro-layout';
import { Layout } from 'antd';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import logo from '../assets/logo-w.png';

const { Footer } = Layout;

const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };

    return canReadAny(localItem.path) || canReadOwn(localItem.path) ? localItem : null;
  });

const footerRender = (_, defaultDom) => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      江西旅游项目合作通 ©{new Date().getFullYear()} 江西省旅游集团 版权所有
    </Footer>
  );
};

const BasicLayout = props => {
  const { dispatch, children, settings } = props;
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'settings/getSetting',
      });
    }

    (async () => {
      const user = await getUserInfo();
      setCurrentUser(user);
    })();
  }, []);

  /**
   * init variables
   */

  const handleMenuCollapse = payload =>
    dispatch &&
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });

  return (
    <BlankLayout>
      <ProLayout
        logo={logo}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
              defaultMessage: 'Home',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={footerRender}
        menuDataRender={menuDataRender}
        formatMessage={formatMessage}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
        {...props}
        {...settings}
      >
        {children}
      </ProLayout>
    </BlankLayout>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
