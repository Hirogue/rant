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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
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

    const defaultGrantKeys = grants ? Object.keys(grants) : [];

    const defaultRowKeys = rawList
      .filter(item => !!defaultGrantKeys.includes(item.value))
      .map(item => item.id);

    setSelectedRowKeys(defaultRowKeys);
    setExpandedRowKeys(defaultRowKeys);
  }, []);

  const rowSelection = {
    selectedRowKeys,
    onSelectAll: selected => {
      if (selected) {
        rawList.forEach(item => {
          grants[item.value] = {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*'],
          };
        });

        setGrants(grants);
        setSelectedRowKeys(rawList.map(item => item.id));
      } else {
        setGrants({});
        setSelectedRowKeys([]);
      }
    },
    onSelect: (row, selected) => {
      const descendants = rawList.filter(item => item.root.search(row.id) >= 0);

      const descendantKeys = descendants.map(item => item.id);

      let newKeys = selectedRowKeys;

      if (selected) {
        descendants.forEach(item => {
          grants[item.value] = {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*'],
          };
        });

        newKeys = newKeys.concat(descendantKeys);
      } else {
        descendants.forEach(item => {
          delete grants[item.value];
        });

        newKeys = newKeys.filter(item => !descendantKeys.includes(item));
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
