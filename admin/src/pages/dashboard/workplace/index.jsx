import { Q_FETCH_CURRENT_USER } from '@/gql/common';
import { canReadAny } from '@/utils/access-control';
import { IdentityEnum, ProjectStatusEnum, UserStatusEnum } from '@/utils/enum';
import { buildingQuery, IdentityMaps, UserTypeMaps } from '@/utils/global';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useQuery } from '@apollo/react-hooks';
import { CondOperator } from '@nestjsx/crud-request';
import { Avatar, Card, Col, Descriptions, List, Row, Skeleton, Tabs } from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'umi';
import { Q_GET_WORKPLACE_DATA } from '../gql';
import styles from './style.less';

const { TabPane } = Tabs;

const PageHeaderContent = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;

  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }

  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          Hi! {currentUser.realname}
          ，祝你开心每一天！
        </div>
        <div>{currentUser.profile}</div>
      </div>
    </div>
  );
};

const PATH = '/dashboard/workplace';
const AUTH_RESOURCE = '/dashboard/workplace';

export default () => {
  const { data: userResult } = useQuery(Q_FETCH_CURRENT_USER, {
    notifyOnNetworkStatusChange: true,
  });

  const { me = {} } = userResult;

  const { data } = useQuery(Q_GET_WORKPLACE_DATA, {
    notifyOnNetworkStatusChange: true,
    variables: {
      userQS: buildingQuery({
        page: 0,
        limit: 2,
        filter: [
          {
            field: 'identity',
            operator: CondOperator.IN,
            value: [IdentityEnum.FINANCER, IdentityEnum.INVESTOR, IdentityEnum.PROVIDER].join(','),
          },
          { field: 'status', operator: CondOperator.EQUALS, value: UserStatusEnum.PENDING },
        ],
        sort: [{ field: 'create_at', order: 'DESC' }],
      }),
      projectQS: buildingQuery({
        page: 0,
        limit: 2,
        filter: [
          { field: 'status', operator: CondOperator.EQUALS, value: ProjectStatusEnum.PENDING },
        ],
        sort: [{ field: 'create_at', order: 'DESC' }],
      }),
      capitalQS: buildingQuery({
        page: 0,
        limit: 2,
        filter: [
          { field: 'status', operator: CondOperator.EQUALS, value: ProjectStatusEnum.PENDING },
        ],
        sort: [{ field: 'create_at', order: 'DESC' }],
      }),
      productQS: buildingQuery({
        page: 0,
        limit: 2,
        filter: [
          { field: 'status', operator: CondOperator.EQUALS, value: ProjectStatusEnum.PENDING },
        ],
        sort: [{ field: 'create_at', order: 'DESC' }],
      }),
      expertQS: buildingQuery({
        page: 0,
        limit: 2,
        filter: [
          { field: 'status', operator: CondOperator.EQUALS, value: ProjectStatusEnum.PENDING },
        ],
        sort: [{ field: 'create_at', order: 'DESC' }],
      }),
    },
  });

  const { user = {}, project = {}, capital = {}, product = {}, expert = {} } = data || {};

  const renderUser = list => (
    <List
      dataSource={list}
      renderItem={item => (
        <List.Item>
          <Descriptions>
            <Descriptions.Item label="身份">{IdentityMaps[item.identity]}</Descriptions.Item>
            <Descriptions.Item label="主体">{UserTypeMaps[item.type]}</Descriptions.Item>
            <Descriptions.Item label="联系人">{item.realname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{item.phone}</Descriptions.Item>
            <Descriptions.Item label="申请时间">
              {moment(item.create_at).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
          </Descriptions>
        </List.Item>
      )}
      footer={<Link to="/users/customer/list">查看更多</Link>}
    />
  );
  const renderProject = list => (
    <List
      dataSource={list}
      renderItem={item => (
        <List.Item>
          <Descriptions>
            <Descriptions.Item label="标题">{item.title}</Descriptions.Item>
            <Descriptions.Item label="融资金额">{item.amount}万元</Descriptions.Item>
            <Descriptions.Item label="所在地区">{item.area_path}</Descriptions.Item>
            <Descriptions.Item label="联系人">{item.creator.realname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{item.creator.phone}</Descriptions.Item>
            <Descriptions.Item label="申请时间">
              {moment(item.create_at).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
          </Descriptions>
        </List.Item>
      )}
      footer={<Link to="/if/projects/list">查看更多</Link>}
    />
  );
  const renderCapital = list => (
    <List
      dataSource={list}
      renderItem={item => (
        <List.Item>
          <Descriptions>
            <Descriptions.Item label="标题">{item.title}</Descriptions.Item>
            <Descriptions.Item label="投资金额">{item.amount}万元</Descriptions.Item>
            <Descriptions.Item label="所在地区">{item.area_path}</Descriptions.Item>
            <Descriptions.Item label="联系人">{item.creator.realname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{item.creator.phone}</Descriptions.Item>
            <Descriptions.Item label="申请时间">
              {moment(item.create_at).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
          </Descriptions>
        </List.Item>
      )}
      footer={<Link to="/if/capitals/list">查看更多</Link>}
    />
  );
  const renderProduct = list => (
    <List
      dataSource={list}
      renderItem={item => (
        <List.Item>
          <Descriptions>
            <Descriptions.Item label="金融服务">{item.product.name}</Descriptions.Item>
            <Descriptions.Item label="联系人">{item.applicant.realname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{item.applicant.phone}</Descriptions.Item>
            <Descriptions.Item label="申请时间">
              {moment(item.create_at).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
          </Descriptions>
        </List.Item>
      )}
      footer={<Link to="/apply/apply-product/list">查看更多</Link>}
    />
  );
  const renderExpert = list => (
    <List
      dataSource={list}
      renderItem={item => (
        <List.Item>
          <Descriptions>
            <Descriptions.Item label="专家姓名">{item.expert.name}</Descriptions.Item>
            <Descriptions.Item label="联系人">{item.applicant.realname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{item.applicant.phone}</Descriptions.Item>
            <Descriptions.Item label="申请时间">
              {moment(item.create_at).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
          </Descriptions>
        </List.Item>
      )}
      footer={<Link to="/apply/apply-product/list">查看更多</Link>}
    />
  );

  const panes = [
    { title: `V1会员申请（${user.total || 0}）`, content: renderUser(user.data || []), key: '1' },
    {
      title: `发布项目（${project.total || 0}）`,
      content: renderProject(project.data || []),
      key: '2',
    },
    {
      title: `发布资金（${capital.total || 0}）`,
      content: renderCapital(capital.data || []),
      key: '3',
    },
    {
      title: `申请金融服务（${product.total || 0}）`,
      content: renderProduct(product.data || []),
      key: '4',
    },
    {
      title: `约见专家（${expert.total || 0}）`,
      content: renderExpert(expert.data || []),
      key: '5',
    },
  ];

  return (
    <PageHeaderWrapper content={<PageHeaderContent currentUser={me} />}>
      <Row gutter={24}>
        <Col>
          {canReadAny(AUTH_RESOURCE) ? (
            <Card>
              <Tabs defaultActiveKey="1">
                {panes.map(pane => (
                  <TabPane tab={pane.title} key={pane.key}>
                    {pane.content}
                  </TabPane>
                ))}
              </Tabs>
            </Card>
          ) : null}
        </Col>
      </Row>
    </PageHeaderWrapper>
  );
};
