import { Q_GET_PRODUCT_CATEGORIES } from '@/gql/product';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useQuery } from '@apollo/react-hooks';
import StandardRow from '@/components/StandardRow';
import { Button, Card, Row, Col, Input, Spin, Table, Tooltip } from 'antd';
import styles from './style.less';

const ButtonGroup = Button.Group;
const { Search } = Input;

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '排序',
    dataIndex: 'sort',
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
  const { loading, data, refetch } = useQuery(Q_GET_PRODUCT_CATEGORIES, {
    notifyOnNetworkStatusChange: true,
  });

  const { productCategories } = data;

  return (
    <PageHeaderWrapper>
      <StandardRow grid last>
        <Row gutter={16}>
          <Col lg={5}>
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
          </Col>
          <Col lg={8}>
            <Search
              className={styles.extraContentSearch}
              placeholder="请输入搜索关键词"
              onSearch={keyword => refetch({ page: 0, keyword })}
            />
          </Col>
        </Row>
      </StandardRow>

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
        >
          <Spin spinning={loading} size="large">
            <Table
              rowKey="id"
              columns={columns}
              rowSelection={rowSelection}
              dataSource={productCategories || []}
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
