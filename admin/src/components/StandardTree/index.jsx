import { Tree, Input, Divider } from 'antd';
import { Fragment, useState } from 'react';

const getTreeData = data =>
  data.map(item => {
    if (item.children) {
      return { ...item, key: item.id, children: getTreeData(item.children) };
    }
    return { ...item, key: item.id, children: [] };
  });

export default props => {
  const [checkedKeys, setCheckedKeys] = useState([]);
  const { treeData, onCheck, onSelect } = props;

  return (
    <Fragment>
      <Divider orientation="left">{`已选中 ${checkedKeys.length} 项`}</Divider>
      <Tree
        checkable
        onCheck={keys => {
          setCheckedKeys(keys);
          onCheck(keys);
        }}
        onSelect={(key, e) => onSelect(e)}
        treeData={getTreeData(treeData)}
      />
    </Fragment>
  );
};
