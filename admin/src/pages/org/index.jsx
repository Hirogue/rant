import { PageHeaderWrapper } from '@ant-design/pro-layout';
import StandardRow from '@/components/StandardRow';
import { Row, Col, Tree } from 'antd';
import StandardActions from '@/components/StandardActions';

const { TreeNode } = Tree;

export default () => {
  const actions = [
    { name: '刷新', icon: 'reload', action: () => '' },
    { name: '新增', icon: 'file-add', action: () => '' },
    {
      name: '删除',
      icon: 'delete',
      action: () => {
        // deleteUser({ variables: { ids: selectedRows.map(item => item.id).join(',') } });
      },
      // disabled: selectedRows.length <= 0,
      confirm: true,
      confirmTitle: `确定要删除吗?`,
    },
  ];

  const renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });

  return (
    <PageHeaderWrapper>
      <StandardRow>
        <Row>
          <Col lg={6}>
            <StandardActions actions={actions} />
          </Col>
        </Row>
      </StandardRow>
      <StandardRow bodyStyle={{ marginTop: 10 }}>
        <Row>
          <Col lg={8}>
            <Tree checkable loadData={async e => console.log(e.props.dataRef)}>
              {renderTreeNodes([
                { title: 'Expand to load', key: '0' },
                { title: 'Expand to load', key: '1' },
                { title: 'Tree Node', key: '2', isLeaf: true },
              ])}
            </Tree>
          </Col>
          <Col lg={16}>action</Col>
        </Row>
      </StandardRow>
    </PageHeaderWrapper>
  );
};
