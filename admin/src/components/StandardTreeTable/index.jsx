import { Card, Table } from 'antd';
import React from 'react';

export const getTreeData = data =>
  data.map(item => {
    if (item.children && item.children.length > 0) {
      return {
        ...item,
        children: getTreeData(item.children),
      };
    }

    delete item.children;

    return item;
  });

export default props => {
  const { loading, columns, rowKey, size, onRowSelectionChange, dataSource } = props;

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      onRowSelectionChange && onRowSelectionChange(selectedRows);
    },
  };

  return (
    <Card bordered={false} style={{ marginTop: 10 }} bodyStyle={{ padding: '0 10px' }}>
      <Table
        size={size || 'middle'}
        rowKey={rowKey || 'id'}
        columns={columns}
        dataSource={getTreeData(dataSource)}
        rowSelection={rowSelection}
        pagination={false}
      />
    </Card>
  );
};
