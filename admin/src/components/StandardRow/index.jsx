import React from 'react';
import { Card } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const StandardRow = ({ title, children, last, block, grid, ...rest }) => {
  const cls = classNames(styles.standardRow, {
    [styles.standardRowBlock]: block,
    [styles.standardRowLast]: last,
    [styles.standardRowGrid]: grid,
  });
  return (
    <Card bordered={false}>
      <div className={cls} {...rest}>
        {title && (
          <div className={styles.label}>
            <span>{title}</span>
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </Card>
  );
};

export default StandardRow;
