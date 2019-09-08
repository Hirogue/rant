import { CondOperator } from '@nestjsx/crud-request';
import { Button, Card, Icon, Input, Table, TreeSelect } from 'antd';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { getTreeData, mergeParams } from '../../lib/global';

export default props => {
  const {
    loading,
    scroll,
    columns,
    rowKey,
    size,
    defaultFilter,
    state,
    pagination,
    dataSource,
    onChange,
    onRowSelectionChange,
  } = props;
  const [searchTexts, setSearchTexts] = useState({});
  const [selectedCount, setSelectedCount] = useState(0);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedCount(selectedRowKeys.length);
      onRowSelectionChange && onRowSelectionChange(selectedRows);
    },
  };

  const renderColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          value={selectedKeys}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => confirm()}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchTexts[dataIndex]]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ),
  });

  const renderColumnTreeSelectorProps = data => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <TreeSelect
          style={{ width: 300 }}
          value={selectedKeys}
          allowClear
          multiple
          showSearch
          treeNodeLabelProp={data.treeNodeLabelProp || 'title'}
          treeNodeFilterProp={data.treeNodeFilterProp || 'value'}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={getTreeData(data.treeFilters)}
          treeDefaultExpandAll
          onChange={value => setSelectedKeys(value ? value : [])}
        />
        <Button type="link" onClick={() => confirm()} size="small">
          确定
        </Button>
        <Button type="link" onClick={() => clearFilters()} size="small">
          重置
        </Button>
      </div>
    ),
  });

  const searchKeys = [];
  const tableColumns = columns.map(item => {
    if (item.search) {
      delete item.search;
      searchKeys.push(item.dataIndex);
      return { ...item, ...renderColumnSearchProps(item.dataIndex) };
    }

    if (item.treeSelector) {
      delete item.treeSelector;

      return { ...item, ...renderColumnTreeSelectorProps(item) };
    }

    return item;
  });

  const onTableChange = (pagination, filters, sorter, extra) => {
    let sort = null;
    let order = null;

    if (!isEmpty(sorter)) {
      sort = sorter.columnKey;
      order = sorter.order === 'ascend' ? 'ASC' : 'DESC';
    }

    if (onChange) {
      const searchTextObj = {};
      const filterParams = Object.keys(filters).map(key => {
        if (searchKeys.includes(key)) {
          const value = filters[key].join('');
          searchTextObj[key] = value;
          return { field: key, operator: CondOperator.CONTAINS, value };
        } else {
          return { field: key, operator: CondOperator.IN, value: filters[key].join(',') };
        }
      });

      setSearchTexts(searchTextObj);

      const filter = defaultFilter || [];

      const newParams = {
        page: pagination.current,
        limit: pagination.pageSize,
        filter: [...filter, ...filterParams],
        sort: [{ field: sort, order }],
      };

      if (filter.length > 0) {
        newParams.filter = [...filter, ...filterParams];
      } else {
        newParams.filter = filterParams;
      }

      onChange(mergeParams(state, newParams));
    }
  };

  return (
    <Card bordered={false} style={{ marginTop: 10 }} bodyStyle={{ padding: '0 10px' }}>
      <Table
        loading={loading}
        size={size || 'middle'}
        rowKey={rowKey || 'id'}
        columns={tableColumns}
        dataSource={dataSource}
        onChange={onTableChange}
        pagination={pagination}
        scroll={scroll}
      />
    </Card>
  );
};
