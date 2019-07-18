import 'antd/dist/antd.css';
import React, { useState } from 'react';
import moment from 'moment';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Layout, Form, PageHeader, List, Input, Drawer, Button, Popconfirm, Skeleton, Divider, BackTop, Tooltip, message } from 'antd';
import withData from "../lib/apollo";

const { Content } = Layout;

const GET_TODOS = gql`
    query getTodos($page: Int!) {
        todos(page: $page) {
            items {
                id
                title
                create_at
                update_at
            }
            total
            page,
            totalPage,
            hasMore
        }
    }
`;

const REMOVE_TODO = gql`
    mutation removeTodo($id: String!) {
        removeTodo(id: $id)
    }
`;

const ADD_TODO = gql`
    mutation addTodo($newTodoData: NewTodoInput!) {
        addTodo(newTodoData: $newTodoData) {
            id
        }
    }
`;

const EDIT_TODO = gql`
    mutation editTodo($editTodoData: EditTodoInput!) {
        editTodo(editTodoData: $editTodoData) {
            id
        }
    }
`;

const RemoveBtn = (props) => {
    const { item, fetchMore } = props;
    const [removeTodo, { data }] = useMutation(REMOVE_TODO, {
        variables: { id: item.id },
        update: (proxy, mutationResult) => {
            const cacheData = proxy.readQuery({
                query: GET_TODOS,
                variables: { page: 0 }
            });

            fetchMore({
                variables: {
                    page: 0
                },
                updateQuery: (prev, { fetchMoreResult }) => {

                    if (!fetchMoreResult) return cacheData;

                    fetchMoreResult.todos.page = cacheData.todos.page;
                    fetchMoreResult.todos.items = cacheData.todos.items
                        .filter(todo => todo.id !== item.id);

                    return fetchMoreResult;
                }
            })

            message.success('Successful!');
        }
    });

    return <Tooltip title="Delete">
        <Popconfirm
            title="Are you sure delete this item?"
            onConfirm={() => removeTodo()}
            okText="Yes"
            cancelText="No"
        >
            <Button type="danger" shape="circle" icon="delete" />
        </Popconfirm>
    </Tooltip>
}

const CreateBtn = (props) => {
    return <Tooltip title="Create new">
        <Button type="primary" shape="circle" icon="plus" onClick={() => props.onClick()} />
    </Tooltip>
}

const UpdateBtn = (props) => {
    return <Tooltip title="Edit">
        <Button type="primary" shape="circle" icon="edit" onClick={() => props.onClick()} />
    </Tooltip>
}

const TodoForm = Form.create({ name: 'todoForm' })((props) => {
    const { refetch, target, visible, onClose, form: { getFieldDecorator, getFieldsValue } } = props;

    const [addTodo, { }] = useMutation(ADD_TODO, {
        variables: { newTodoData: getFieldsValue() },
        update: (proxy, mutationResult) => {
            refetch();
        }
    });

    const [editTodo, { }] = useMutation(EDIT_TODO, {
        variables: { editTodoData: { id: target ? target.id : '', ...getFieldsValue() } }
        ,
        update: (proxy, mutationResult) => {
            refetch();
        }
    });

    const onSubmit = (e) => {
        e.preventDefault();

        props.form.validateFields(async (err, values) => {
            if (!err) {
                if (!!target) {
                    editTodo();
                } else {
                    addTodo();
                }

                onClose();
            }
        });
    }

    return <Drawer
        title={!!target ? 'Edit' : 'Create New'}
        width={400}
        closable={false}
        onClose={onClose}
        visible={visible}
    >
        <Form onSubmit={onSubmit} className="login-form">
            <Form.Item>
                {getFieldDecorator('title', {
                    initialValue: !!target ? target.title : '',
                    rules: [{ required: true, message: 'Please enter the title' }],
                })(
                    <Input
                        placeholder="Please enter the title"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                <p style={{ textAlign: "right" }}>
                    <Button type="danger" style={{ marginRight: 10 }} onClick={() => onClose()}>Cancel</Button>
                    <Button type="primary" htmlType="submit">OK</Button>
                </p>
            </Form.Item>
        </Form>
    </Drawer>
});

export default withData(props => {

    const [visible, setVisible] = useState(false);
    const [target, setTarget] = useState(null);

    const { loading, data, fetchMore, refetch } = useQuery(GET_TODOS, {
        variables: { page: 0 },
        notifyOnNetworkStatusChange: true
    });

    const { items, hasMore, page } = data.todos || {};

    const loadMore =
        !!hasMore ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={() => fetchMore({
                    variables: {
                        page: page + 1
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;

                        fetchMoreResult.todos.items = prev.todos.items
                            .concat(fetchMoreResult.todos.items);

                        return fetchMoreResult;
                    }
                })}>loading more</Button>
            </div>
        ) : null;

    const onClose = () => {
        setVisible(false);
        setTarget(null);
    }

    return (
        <Layout style={{ background: '#fff' }}>
            <Content style={{ background: '#fff', boxShadow: "0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15)", borderRadius: '5px', width: '60%', padding: '0px 50px', margin: "64px auto" }}>
                <PageHeader title="TodoList" />
                <div style={{ padding: 24, minHeight: 480 }}>
                    <CreateBtn onClick={() => {
                        setTarget(null);
                        setVisible(true);
                    }} fetchMore={fetchMore} />
                    <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={items || []}
                        loading={loading}
                        loadMore={loadMore}
                        renderItem={item => (
                            <List.Item actions={[
                                <UpdateBtn onClick={() => {
                                    setTarget(item);
                                    setVisible(true);
                                }} item={item} fetchMore={fetchMore} />,
                                <RemoveBtn item={item} visible={visible} fetchMore={fetchMore} />
                            ]}>
                                <List.Item.Meta
                                    title={item.title}
                                    description={moment(item.update_at).toNow()}
                                />
                            </List.Item>
                        )}
                    />
                    <TodoForm refetch={refetch} target={target} visible={visible} onClose={onClose} />
                    <Divider />
                    <BackTop />
                </div>
            </Content>
        </Layout>
    );
});