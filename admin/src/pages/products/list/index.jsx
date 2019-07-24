import { Q_GET_PRODUCTS } from '@/gql/product';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useQuery } from '@apollo/react-hooks';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  List,
  Pagination,
  Row,
  Select,
  Tooltip,
  Typography,
} from 'antd';
import moment from 'moment';
import React, { Fragment } from 'react';
import StandardFormRow from '@/components/StandardFormRow';
import styles from './style.less';

const ButtonGroup = Button.Group;
const { Search } = Input;
const { Option } = Select;
const FormItem = Form.Item;
const { Title, Paragraph } = Typography;

const formItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

export default Form.create()(props => {
  const { loading, data, refetch } = useQuery(Q_GET_PRODUCTS, {
    notifyOnNetworkStatusChange: true,
  });

  const { form } = props;
  const { getFieldDecorator } = form;

  const { products } = data;

  let list = [];
  let paginationProps = false;

  if (!!products) {
    const { items, total } = products;

    list = items;
    paginationProps = {
      style: { float: 'right' },
      size: 'small',
      total,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条记录`,
    };
  }

  const cardList = list ? (
    <List
      rowKey="id"
      loading={loading}
      grid={{
        gutter: 24,
        xl: 4,
        lg: 3,
        md: 3,
        sm: 2,
        xs: 1,
      }}
      dataSource={list}
      renderItem={item => (
        <List.Item>
          <Card className={styles.card} hoverable cover={<img alt={item.name} src={item.cover} />}>
            <Card.Meta
              title={<a>{item.name}</a>}
              description={
                <Paragraph
                  className={styles.item}
                  ellipsis={{
                    rows: 3,
                  }}
                >
                  [{item.category.name}] {item.slug}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
              <span>{moment(item.updated_at).fromNow()}</span>
            </div>
          </Card>
        </List.Item>
      )}
    />
  ) : null;

  return (
    <PageHeaderWrapper>
      <div className={styles.coverCardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow grid last>
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
            </StandardFormRow>
          </Form>
        </Card>
        <div className={styles.cardList}>
          {cardList}
          <Pagination {...paginationProps} />
        </div>
      </div>
    </PageHeaderWrapper>
  );
});
