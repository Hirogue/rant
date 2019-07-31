import { Tree, Input, Divider, message } from 'antd';
import { Fragment } from 'react';

const getTreeData = (data, root) =>
  data.map(item => {
    item.__typename && delete item.__typename;

    if (item.children) {
      return {
        ...item,
        key: item.id,
        children: getTreeData(item.children, root || item),
        dataRef: item,
        root,
      };
    }

    return { ...item, key: item.id, children: [], dataRef: item, root };
  });

export default props => {
  const { checkedKeys, treeData, onCheck, onSelect, onDrop } = props;

  return (
    <Fragment>
      <Divider orientation="left">{`已选中 ${checkedKeys.length} 项`}</Divider>
      <Tree
        checkable
        onCheck={keys => onCheck(keys)}
        onSelect={(key, e) => onSelect(e)}
        draggable={true}
        onDrop={e => {
          if (!e.dragNode.props.root) {
            message.warn('不支持根节点的修改');
            return false;
          }

          if (
            e.dragNode.props.root !== e.node.props.root &&
            e.dragNode.props.root !== e.node.props.id
          ) {
            message.warn('不支持跨根节点的修改');
            return false;
          }

          onDrop(e.dragNode.props.dataRef, e.node.props.dataRef);
        }}
        treeData={getTreeData(treeData)}
      />
    </Fragment>
  );
};
