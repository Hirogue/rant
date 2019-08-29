import { Q_FETCH_CURRENT_USER } from '@/gql';
import { logout } from '@/utils/global';
import Logger from '@/utils/logger';
import { useQuery } from '@apollo/react-hooks';
import { Avatar, Icon, Menu, Spin } from 'antd';
import React from 'react';
import { router } from 'umi';
import { FormattedMessage } from 'umi-plugin-react/locale';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

const onMenuClick = e => {
  switch (e.key) {
    case 'settings':
      router.push('/settings');
      break;
    case 'logout':
      logout();
      break;
    default:
      break;
  }
};

export default props => {
  const { loading, data } = useQuery(Q_FETCH_CURRENT_USER, {
    notifyOnNetworkStatusChange: true,
  });

  let currentUser = {};

  if (data) {
    currentUser = data.me || {};
  }

  if (loading || !currentUser) {
    return (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    );
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="settings">
        <Icon type="setting" />
        <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Icon type="logout" />
        <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        <span className={styles.name}>
          {currentUser.isSuperAdmin
            ? '[超级管理员] '
            : currentUser.role
            ? `[${currentUser.role.name}] `
            : ''}
          {currentUser.realname || currentUser.account}
        </span>
      </span>
    </HeaderDropdown>
  );
};
