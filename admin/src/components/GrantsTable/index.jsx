import resources from '@/config/resource';
import { useApolloClient } from '@apollo/react-hooks';
import { Affix, Card, Radio, Table, message } from 'antd';
import gql from 'graphql-tag';
import React, { Fragment, useEffect, useState } from 'react';
import StandardActions from '../StandardActions';

export const M_UPDATE_GRANTS = gql`
  mutation updateGrants($id: String!, $data: RoleInput!) {
    updateGrants(id: $id, data: $data)
  }
`;

export default props => {
  const {
    id,
    refetch,
    loading,
    rowKey,
    size,
    onRowSelectionChange,
    defaultGrants,
    dataSource,
  } = props;

  const client = useApolloClient();

  const [grants, setGrants] = useState(defaultGrants);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [treeList, setTreeList] = useState([]);
  const [rawList, setRawList] = useState([]);

  const getTreeData = (data, root = '') =>
    data.map(item => {
      item.root = `${root ? root + '.' : ''}${item.value}`;
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
    setTreeList(getTreeData(resources));

    const defaultGrantKeys = grants ? Object.keys(grants) : [];

    const defaultRowKeys = rawList
      .filter(item => !!defaultGrantKeys.includes(item.value))
      .map(item => item.value);

    setSelectedRowKeys(defaultRowKeys);
    setExpandedRowKeys(defaultRowKeys);
  }, []);

  const rowSelection = {
    selectedRowKeys,
    onSelectAll: selected => {
      if (selected) {
        rawList.forEach(item => {
          if (item.value) {
            grants[item.value] = {
              'create:any': ['*'],
              'read:any': ['*'],
              'update:any': ['*'],
              'delete:any': ['*'],
            };
          }

          if (item.route) {
            grants[item.route] = { 'read:any': ['*'] };
          }
        });

        setGrants(grants);
        setSelectedRowKeys(rawList.map(item => item.value));
      } else {
        setGrants({});
        setSelectedRowKeys([]);
      }
    },
    onSelect: (row, selected) => {
      const descendants = rawList.filter(item => item.root.search(row.value) >= 0);

      const descendantKeys = descendants.map(item => item.value);

      let newKeys = selectedRowKeys;

      if (selected) {
        descendants.forEach(item => {
          if (item.value) {
            grants[item.value] = {
              'create:any': ['*'],
              'read:any': ['*'],
              'update:any': ['*'],
              'delete:any': ['*'],
            };
          }

          if (item.route) {
            grants[item.route] = { 'read:any': ['*'] };
          }
        });

        newKeys = newKeys.concat(descendantKeys);
      } else {
        descendants.forEach(item => {
          if (item.value) {
            delete grants[item.value];
          }

          if (item.route) {
            delete grants[item.route];
          }
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
          rawList.filter(item => item.root.search(row.value) >= 0).map(item => item),
        );
      });

      setExpandedRowKeys(expandedRows.map(item => item.value));
      onRowSelectionChange && onRowSelectionChange(selectedRows);
    },
  };

  const getGrantValue = (action, record) => {
    const grant = grants[record.value];

    if (!!grant) {
      if (!!grant[`${action}:any`]) return 'any';
      if (!!grant[`${action}:own`]) return 'own';
    }

    return '';
  };

  const onGrantChange = (action, value, record) => {
    if (grants[record.value]) {
      delete grants[record.value][`${action}:any`];
      delete grants[record.value][`${action}:own`];

      if (!!value) {
        grants[record.value][`${action}:${value}`] = ['*'];
      }
      setGrants({ ...grants });
    }
  };

  const renderGrantAction = (action, record) =>
    grants[record.value] ? (
      <Fragment>
        <Radio.Group
          value={getGrantValue(action, record)}
          onChange={e => onGrantChange(action, e.target.value, record)}
        >
          <Radio value="">无</Radio>
          <Radio value="any">任意</Radio>
          <Radio value="own">所属</Radio>
        </Radio.Group>
      </Fragment>
    ) : (
      ''
    );

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '新增',
      render: record => renderGrantAction('create', record),
    },
    {
      title: '查询',
      render: record => renderGrantAction('read', record),
    },
    {
      title: '修改',
      render: record => renderGrantAction('update', record),
    },
    {
      title: '删除',
      render: record => renderGrantAction('delete', record),
    },
  ];

  return (
    <Card bordered={false} style={{ marginTop: 10 }} bodyStyle={{ padding: '0 10px' }}>
      <Affix style={{ display: 'inline-block', marginBottom: 10 }} offsetTop={80}>
        <StandardActions
          actions={[
            {
              name: '刷新',
              icon: 'reload',
              action: () => refetch(),
            },
            {
              name: '保存',
              icon: 'save',
              action: () => {
                client.mutate({
                  mutation: M_UPDATE_GRANTS,
                  variables: {
                    id,
                    data: { grants: JSON.stringify(grants) },
                  },
                  update: (cache, { data }) => {
                    if (data.updateGrants) {
                      refetch();
                      setGrants({ ...grants });
                      message.success('授权成功');
                    }
                  },
                });
              },
            },
          ]}
        />
      </Affix>
      <Table
        size={size || 'middle'}
        rowKey={rowKey || 'value'}
        columns={columns}
        expandedRowKeys={expandedRowKeys}
        dataSource={treeList}
        rowSelection={rowSelection}
        pagination={false}
      />
    </Card>
  );
};
