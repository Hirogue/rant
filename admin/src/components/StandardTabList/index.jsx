import { Card } from 'antd';
import { useState } from 'react';
import styles from './index.less';

export default props => {
  const { tabList, activeTabKey, onActiveTabKeyChange, loading = false } = props;

  const keyMaps = Object.keys(tabList).map(key => ({ key, tab: tabList[key]['name'] }));

  return (
    <Card
      className={styles.tabsCard}
      bordered={false}
      loading={loading}
      tabList={keyMaps}
      activeTabKey={activeTabKey}
      onTabChange={onActiveTabKeyChange}
    >
      {tabList[activeTabKey]['render'] && tabList[activeTabKey]['render']()}
    </Card>
  );
};
