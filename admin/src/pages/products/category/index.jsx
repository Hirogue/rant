import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card, Input, Spin, Table, Tooltip } from 'antd';
import styles from './style.less';

const ButtonGroup = Button.Group;
const { Search } = Input;

const extraContent = refetch => (
  <div className={styles.extraContent}>
    <Search
      className={styles.extraContentSearch}
      placeholder="请输入搜索关键词"
      onSearch={keyword => refetch({ page: 0, keyword })}
    />
    <ButtonGroup className={styles.extraActionList}>
      <Tooltip title="刷新">
        <Button icon="reload" onClick={() => refetch()} />
      </Tooltip>
      <Tooltip title="新增">
        <Button icon="file-add" />
      </Tooltip>
      <Tooltip title="删除">
        <Button icon="delete" />
      </Tooltip>
      <Tooltip title="导入">
        <Button icon="import" />
      </Tooltip>
    </ButtonGroup>
  </div>
);

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
  },
];

const data = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

// rowSelection objects indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

export default () => {
  const refetch = () => {};

  return (
    <PageHeaderWrapper>
      <div className={styles.standardList}>
        <Card
          className={styles.listCard}
          bordered={false}
          style={{
            marginTop: 24,
          }}
          bodyStyle={{
            padding: '0 32px 40px 32px',
          }}
          extra={extraContent(refetch)}
        >
          <Spin spinning={false} size="large">
            <Table
              rowKey="id"
              columns={columns}
              rowSelection={rowSelection}
              dataSource={data}
              // rowSelection={rowSelection}
              // columns={columns}
              // dataSource={list}
              // pagination={paginationProps}
              // onChange={onTableChange}
            />
          </Spin>
        </Card>
      </div>
    </PageHeaderWrapper>
  );
};
