import { Card, Table } from 'antd';
import React, { useEffect, useState } from 'react';

export default props => {
  const {
    loading,
    columns,
    rowKey,
    size,
    onRowSelectionChange,
    grants,
    setGrants,
    dataSource,
  } = props;

  const defaultRowKeys = grants ? Object.keys(grants) : [];

  const [selectedRowKeys, setSelectedRowKeys] = useState(defaultRowKeys);
  const [expandedRowKeys, setExpandedRowKeys] = useState(defaultRowKeys);
  const [treeList, setTreeList] = useState([]);
  const [rawList, setRawList] = useState([]);

  const getTreeData = (data, root = '') =>
    data.map(item => {
      item.root = `${root ? root + '.' : ''}${item.id}`;
      item.level = item.root.split('.').length;

      rawList.push(item);
      setRawList(rawList);

      if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: getTreeData(item.children, item.root),
        };
      }
      delete item.children;
      return item;
    });

  useEffect(() => {
    setTreeList(getTreeData(dataSource));
  }, []);

  const rowSelection = {
    selectedRowKeys,
    onSelectAll: selected => {
      if (selected) {
        const selectedRowKeys = rawList.map(item => item.id);

        selectedRowKeys.forEach(item => {
          grants[item] = {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*'],
          };
        });

        setGrants(grants);
        setSelectedRowKeys(selectedRowKeys);
      } else {
        setGrants({});
        setSelectedRowKeys([]);
      }
    },
    onSelect: (row, selected) => {
      const descendants = rawList
        .filter(item => item.root.search(row.id) >= 0)
        .map(item => item.id);

      let newKeys = selectedRowKeys;

      if (selected) {
        descendants.forEach(item => {
          grants[item] = {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*'],
          };
        });

        newKeys = newKeys.concat(descendants);
      } else {
        descendants.forEach(item => {
          delete grants[item];
        });

        newKeys = newKeys.filter(item => !descendants.includes(item));
      }

      setGrants(grants);
      setSelectedRowKeys(newKeys);
    },
    onChange: (keys, selectedRows) => {
      let expandedRows = [];
      selectedRows.forEach(row => {
        expandedRows = expandedRows.concat(
          rawList.filter(item => item.root.search(row.id) >= 0).map(item => item),
        );
      });

      setExpandedRowKeys(expandedRows.map(item => item.id));
      onRowSelectionChange && onRowSelectionChange(selectedRows);
    },
  };

  return (
    <Card bordered={false} style={{ marginTop: 10 }} bodyStyle={{ padding: '0 10px' }}>
      <Table
        size={size || 'middle'}
        rowKey={rowKey || 'id'}
        columns={columns}
        expandedRowKeys={expandedRowKeys}
        dataSource={treeList}
        rowSelection={rowSelection}
        pagination={false}
      />
    </Card>
  );
};
