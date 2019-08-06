import { Button, Table, Input, InputNumber, Popconfirm, Form, Affix } from 'antd';
import { useContext, useState, Fragment, useEffect } from 'react';
import shortid from 'shortid';
import StandardActions from '@/components/StandardActions';

const ButtonGroup = Button.Group;
const EditableContext = React.createContext();

const EditableCell = props => {
  const { getFieldDecorator } = useContext(EditableContext);

  const { editing, dataIndex, title, inputType, record, index, children, ...restProps } = props;

  const getInput = () => {
    if (inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item style={{ margin: 0 }}>
          {getFieldDecorator(dataIndex, {
            rules: [
              {
                required: true,
                message: `请输入${title}!`,
              },
            ],
            initialValue: record[dataIndex],
          })(getInput())}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default Form.create()(props => {
  const { data, columns, onChange, form } = props;
  const [editingKey, setEditingKey] = useState('');
  const [dataSource, setDataSource] = useState([]);

  const actions = [
    { name: '新增', icon: 'file-add', action: () => add() },
    { name: '保存', icon: 'save', action: () => onChange(dataSource) },
  ];

  useEffect(() => {
    setDataSource(data.map((item, key) => ({ ...item, key: shortid.generate() })));
  }, []);

  const isEditing = record => record.key === editingKey;
  const cancel = () => setEditingKey('');
  const edit = key => setEditingKey(key);
  const save = key => {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      setDataSource(dataSource.map((item, index) => (item.key === key ? row : item)));
      cancel();
    });
  };
  const remove = key => {
    setDataSource(dataSource.filter((item, index) => item.key !== key));
    cancel();
  };
  const add = () => {
    const newData = { key: shortid.generate() };
    columns.forEach(item => {
      newData[item.dataIndex] = item.defaultValue;
    });

    setDataSource([newData, ...dataSource]);
  };

  const tableColumns = [
    ...columns,
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Fragment>
            <Button type="link" size="small" onClick={() => save(record.key)}>
              保存
            </Button>

            <Popconfirm title="确定要取消吗?" onConfirm={() => cancel(record.key)}>
              <Button type="link" size="small">
                取消
              </Button>
            </Popconfirm>
          </Fragment>
        ) : (
          <Fragment>
            <Button
              type="link"
              size="small"
              disabled={editingKey !== ''}
              onClick={() => edit(record.key)}
            >
              编辑
            </Button>
            <Popconfirm
              title="确定要取消吗?"
              disabled={editingKey !== ''}
              onConfirm={() => remove(record.key)}
            >
              <Button type="link" size="small" disabled={editingKey !== ''}>
                删除
              </Button>
            </Popconfirm>
          </Fragment>
        );
      },
    },
  ].map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.inputType || 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const components = {
    body: {
      cell: EditableCell,
    },
  };

  return (
    <EditableContext.Provider value={form}>
      <Affix style={{ display: 'inline-block', marginBottom: 10 }} offsetTop={80}>
        <StandardActions actions={actions} />
      </Affix>

      <Table
        rowKey="key"
        components={components}
        bordered
        dataSource={dataSource}
        columns={tableColumns}
        pagination={{
          onChange: cancel,
        }}
      />
    </EditableContext.Provider>
  );
});
