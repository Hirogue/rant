import { Card } from 'antd';
import { useState } from 'react';
import styles from './index.less';

export default props => {
  const { tabList, defaultKey } = props;
  const [tapKey, setTapKey] = useState(defaultKey);

  const keyMaps = Object.keys(tabList).map(key => ({ key, tab: tabList[key]['name'] }));

  return (
    <Card
      className={styles.tabsCard}
      bordered={false}
      tabList={keyMaps}
      activeTabKey={tapKey}
      onTabChange={key => setTapKey(key)}
    >
      {tabList[tapKey]['render'] && tabList[tapKey]['render']()}
    </Card>
  );
};
