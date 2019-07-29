import ImageCropper from '@/components/ImageCropper';
import StandardTabList from '@/components/StandardTabList';
import { uploadOne } from '@/utils/fetch';
import { IdentityMaps, UserStatusMaps } from '@/utils/global';
import Logger from '@/utils/logger';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Affix, Avatar, Button, Descriptions, Dropdown, Icon, Skeleton, Statistic } from 'antd';
import { merge } from 'lodash';
import React, { Fragment } from 'react';
import { router, withRouter } from 'umi';
import { M_UPDATE_USER, Q_GET_USER } from '../gql/user';
import styles from './style.less';

const action = (
  <RouteContext.Consumer>
    {({ isMobile }) => {
      if (isMobile) {
        return (
          <Dropdown.Button
            type="primary"
            icon={<Icon type="down" />}
            overlay={mobileMenu}
            placement="bottomRight"
          >
            主操作
          </Dropdown.Button>
        );
      }

      return (
        <Fragment>
          <Button>审核</Button>
          <Affix style={{ display: 'inline-block' }} offsetTop={80}>
            <Button style={{ borderRadius: 4 }} type="primary" onClick={() => router.goBack()}>
              返回
            </Button>
          </Affix>
        </Fragment>
      );
    }}
  </RouteContext.Consumer>
);

const extra = (
  <div className={styles.moreInfo}>
    <Statistic title="状态" value="待审批" />
  </div>
);

const PageHeaderContent = ({ user }) => {
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={user.avatar} />
      </div>
      <div className={styles.content}>{renderDescription(user)}</div>
    </div>
  );
};

const renderDescription = user => (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions className={styles.headerList} size="small" column={1}>
        <Descriptions.Item label="账户名">{user.account}</Descriptions.Item>
        <Descriptions.Item label="身份">{IdentityMaps[user.identity]}</Descriptions.Item>
      </Descriptions>
    )}
  </RouteContext.Consumer>
);

const onAvatarUpload = async (file, target, mutation) => {
  Logger.log('upload file:', file);

  const res = await uploadOne(file);

  Logger.log('res:', res);

  if (!!res && res.relativePath) {
    mutation({
      variables: {
        id: target.id,
        data: {
          avatar: res.relativePath,
        },
      },
    });
  }
};

const renderContent = (data, mutation) => {
  let tabList = {
    base: {
      name: '基础信息',
      render: () => '基础信息',
    },
  };

  if (data) {
    tabList = merge(tabList, {
      avatar: {
        name: '头像',
        render: () => (
          <ImageCropper
            url={data.avatar}
            onUpload={file => onAvatarUpload(file, data, mutation)}
            width={128}
            height={128}
          />
        ),
      },
    });
  }

  return (
    <PageHeaderWrapper
      title={data ? '编辑用户' : '新增用户'}
      extra={data ? action : null}
      className={styles.pageHeader}
      content={data ? <PageHeaderContent user={data} /> : null}
      extraContent={
        data ? (
          <div className={styles.moreInfo}>
            <Statistic title="状态" value={UserStatusMaps[data.status]} />
          </div>
        ) : null
      }
    >
      <div className={styles.main}>
        <GridContent>
          <StandardTabList defaultKey="base" tabList={tabList} />
        </GridContent>
      </div>
    </PageHeaderWrapper>
  );
};

export default withRouter(props => {
  const {
    match: {
      params: { id },
    },
  } = props;

  if (!id) return renderContent(null);

  const { loading, data, refetch } = useQuery(Q_GET_USER, {
    notifyOnNetworkStatusChange: true,
    variables: { id },
  });

  const [updateUser] = useMutation(M_UPDATE_USER, {
    update: (proxy, { data }) => {
      Logger.log('update user data:', data);

      refetch();

      message.success(
        formatMessage({
          id: 'settings.basic.update.success',
        }),
      );
    },
  });

  if (loading || !data) return <Skeleton loading={loading} />;

  const user = data.user || {};

  return renderContent(user, updateUser);
});
