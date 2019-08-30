import { Q_GET_LOGS } from '@/gql';
import { ProjectStatusEnum } from '@/utils/enum';
import { buildingQuery } from '@/utils/global';
import { useQuery } from '@apollo/react-hooks';
import { CondOperator } from '@nestjsx/crud-request';
import { Empty, Form, Icon, Modal, Skeleton, Timeline } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';

export default Form.create()(props => {
  const { title, visible, target, type, onConfirm, setVisible, form } = props;
  const { getFieldDecorator, validateFields } = form;

  const defaultVariables = {
    page: 0,
    limit: 1,
    sort: [{ field: 'create_at', order: 'DESC' }],
  };

  if (target && type) {
    defaultVariables.filter = [
      { field: 'target', operator: CondOperator.EQUALS, value: target },
      { field: 'type', operator: CondOperator.EQUALS, value: type },
    ];

    defaultVariables.limit = 1000;
  }

  const { loading, data, refetch } = useQuery(Q_GET_LOGS, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    variables: { queryString: buildingQuery(defaultVariables) },
  });

  useEffect(() => {
    if (visible) {
      refetch();
    }
  }, [visible]);

  const { queryLog } = data || {};

  if (!queryLog) return <Skeleton loading={loading} active avatar />;

  const logList = queryLog.data;

  return (
    <Modal
      title={title}
      visible={visible}
      width={'60%'}
      maskClosable={true}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      {logList.length > 0 ? (
        <Timeline style={{ padding: 16, height: 500, overflow: 'auto' }}>
          {logList.map((log, index) => {
            const content = `${log.info} -- ${moment(log.create_at).format('YYYY-MM-DD HH:mm:ss')}`;

            switch (log.status) {
              case ProjectStatusEnum.PENDING:
                return (
                  <Timeline.Item key={index} color="orange">
                    {content}
                  </Timeline.Item>
                );
              case ProjectStatusEnum.CHECKED:
                return (
                  <Timeline.Item key={index} color="green">
                    {content}
                  </Timeline.Item>
                );
              case ProjectStatusEnum.WAITING:
                return (
                  <Timeline.Item key={index} color="orange">
                    {content}
                  </Timeline.Item>
                );
              case ProjectStatusEnum.REJECTED:
                return (
                  <Timeline.Item key={index} color="red">
                    {content}
                  </Timeline.Item>
                );
              case ProjectStatusEnum.CANCELLED:
                return (
                  <Timeline.Item key={index} color="red">
                    {content}
                  </Timeline.Item>
                );
              case ProjectStatusEnum.FINISHED:
                return (
                  <Timeline.Item key={index} color="green">
                    {content}
                  </Timeline.Item>
                );
              default:
                return <Timeline.Item key={index}>{content}</Timeline.Item>;
            }
          })}
        </Timeline>
      ) : (
        <Empty />
      )}
    </Modal>
  );
});
