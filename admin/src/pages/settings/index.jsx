import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage } from 'umi-plugin-react/locale';
import BaseView from './components/base';
import BindingView from './components/binding';
import NotificationView from './components/notification';
import SecurityView from './components/security';
import styles from './style.less';

const { Item } = Menu;

const menuMap = {
  base: <FormattedMessage id="settings.menuMap.basic" defaultMessage="Basic Settings" />,
  security: <FormattedMessage id="settings.menuMap.security" defaultMessage="Security Settings" />,
  binding: <FormattedMessage id="settings.menuMap.binding" defaultMessage="Account Binding" />,
  notification: (
    <FormattedMessage
      id="settings.menuMap.notification"
      defaultMessage="New Message Notification"
    />
  ),
};

const getMenu = () => {
  return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
};

const renderChildren = selectKey => {
  switch (selectKey) {
    case 'base':
      return <BaseView />;

    case 'security':
      return <SecurityView />;

    case 'binding':
      return <BindingView />;

    case 'notification':
      return <NotificationView />;

    default:
      break;
  }

  return null;
};

export default () => {
  const [mode, setModel] = useState('inline');
  const [main, setMain] = useState(null);
  const [selectKey, setSelectKey] = useState('base');

  return (
    <GridContent>
      <div className={styles.main} ref={ref => setMain(ref)}>
        <div className={styles.leftMenu}>
          <Menu mode={mode} selectedKeys={[selectKey]} onClick={({ key }) => setSelectKey(key)}>
            {getMenu()}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{menuMap[selectKey]}</div>
          {renderChildren(selectKey)}
        </div>
      </div>
    </GridContent>
  );
};
