import ImageCropper from '@/components/ImageCropper';
import StandardTabList from '@/components/StandardTabList';
import { M_CREATE_PROJECT, M_UPDATE_PROJECT, Q_GET_PROJECT } from '@/gql';
import { IFModeEnum } from '@/utils/enum';
import { uploadOne } from '@/utils/fetch';
import { getAreaList, toGetParentArrayByChildNode } from '@/utils/global';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import {
  Affix,
  Button,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  message,
  Radio,
  Row,
  Select,
} from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { router, withRouter } from 'umi';
import { Q_GET_PROJECT_METADATA } from '../gql';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const action = (
  <RouteContext.Consumer>
    {({ isMobile }) => {
      return (
        <Fragment>
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

const DetailForm = Form.create()(props => {
  const {
    data: {
      industry = [],
      stage = [],
      withdrawal_year = [],
      ratio = [],
      risk = [],
      interest = [],
      occupancy_time = [],
      exit_mode = [],
      data = [],
    },
  } = useQuery(Q_GET_PROJECT_METADATA, {
    notifyOnNetworkStatusChange: true,
  });

  const { form, target, mutation, cover, setCover, area, category, areaList, setCategory } = props;
  const { getFieldDecorator } = form;

  const onUpload = async file => {
    const res = await uploadOne(file);

    if (!!res && res.relativePath) {
      setCover(res.relativePath);
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
      md: {
        span: 12,
      },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  const disabled = false;

  return (
    <Form
      style={{ marginTop: 20 }}
      onSubmit={e => {
        e.preventDefault();

        form.validateFields((err, values) => {
          if (!!err) {
            message.error('请正确填写信息');
            return false;
          }

          if (!cover) {
            message.error('请先上传项目封面');
            return false;
          }

          const data = {
            title: values.title,
            contact: values.contact,
            phone: values.phone,
            company: values.company,
            publish_at: values.publish_at,
            cover,
            amount: values.amount,
            industry: { id: values.industry },
            area: { id: values.area.pop() },
            category,
            stage: { id: values.stage },
            withdrawal_year: { id: values.withdrawal_year },
            ratio: { id: values.ratio },
            exit_mode: values.exit_mode ? values.exit_mode.map(item => ({ id: item })) : null,
            risk: { id: values.risk },
            payment: values.payment,
            interest: { id: values.interest },
            occupancy_time: { id: values.occupancy_time },
            purposes: values.purposes,
            team_info: values.team_info,
            advantage: values.advantage,
            progress: values.progress,
            info: values.info,
            data: values.data ? values.data.map(item => ({ id: item })) : null,
          };

          const variables = { data };

          if (target.id) {
            variables.id = target.id;
          }

          mutation({ variables });
        });
      }}
    >
      <Row>
        <Col>
          <Form.Item {...formItemLayout} label={'标题'}>
            {getFieldDecorator('title', {
              initialValue: target ? target.title : null,
              rules: [
                { required: true, message: '请填写标题', whitespace: true },
                { max: 35, message: '最多35个字符' },
                { min: 5, message: '最少5个字符' },
              ],
            })(<Input disabled={disabled} style={{ width: 500 }} placeholder="请填写标题" />)}
            <div style={{ color: 'red' }}>参考格式：地区+某行业项目+融资方式+金额（附单位）</div>
          </Form.Item>
          <FormItem {...formItemLayout} label="联系人">
            {getFieldDecorator('contact', {
              initialValue: target.contact,
              rules: [
                {
                  required: true,
                  message: '联系人不能为空',
                },
              ],
            })(<Input placeholder="请填写联系人" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="联系方式">
            {getFieldDecorator('phone', {
              initialValue: target.phone,
              rules: [
                {
                  required: true,
                  message: '联系方式不能为空',
                },
              ],
            })(<Input placeholder="请填写联系方式" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="企业名称">
            {getFieldDecorator('company', {
              initialValue: target.company,
            })(<Input placeholder="请填写企业名称" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="发布时间">
            {getFieldDecorator('publish_at', {
              initialValue: moment(target.publish_at),
            })(<DatePicker showTime />)}
          </FormItem>
          <Form.Item {...formItemLayout} label={'项目封面'} required>
            <ImageCropper
              disabled={disabled}
              title="请上传项目封面"
              url={cover}
              onUpload={file => {
                if (file.size > 5 * 1024 * 1024) {
                  message.error('请上传小于5M的图片');
                  return false;
                }

                onUpload(file);
                return false;
              }}
              width={400}
              height={200}
            />
          </Form.Item>

          <Form.Item {...formItemLayout} label={'融资金额'}>
            {getFieldDecorator('amount', {
              initialValue: target ? target.amount : null,
              rules: [{ required: true, message: '请填写融资金额' }],
            })(
              <InputNumber
                disabled={disabled}
                min={1}
                style={{ width: 200 }}
                placeholder="请填写融资金额"
              />,
            )}
            {'  '}万元
          </Form.Item>
          <Form.Item {...formItemLayout} label={'所属行业'}>
            {getFieldDecorator('industry', {
              initialValue: target ? (target.industry ? target.industry.id : null) : null,
              rules: [{ required: true, message: '请选择所属行业' }],
            })(
              <Select disabled={disabled} style={{ width: 200 }} placeholder="请选择所属行业">
                {industry.map(item => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.title}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label={'所在地区'}>
            {getFieldDecorator('area', {
              initialValue: area,
              rules: [{ required: true, message: '请选择所在地区' }],
            })(<Cascader disabled={disabled} placeholder="请选择所在地区" options={areaList} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label={'融资方式'} required>
            <Radio.Group
              disabled={disabled}
              onChange={e => setCategory(e.target.value)}
              value={category}
            >
              <Radio value={IFModeEnum.EQUITY}>股权</Radio>
              <Radio value={IFModeEnum.CLAIM}>债权</Radio>
            </Radio.Group>
          </Form.Item>

          {IFModeEnum.EQUITY === category ? (
            <>
              <Form.Item {...formItemLayout} label={'所处阶段'}>
                {getFieldDecorator('stage', {
                  initialValue: target ? (target.stage ? target.stage.id : null) : null,
                  rules: [{ required: true, message: '请选择所处阶段' }],
                })(
                  <Select disabled={disabled} style={{ width: 200 }} placeholder="请选择所处阶段">
                    {stage.map(item => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.title}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label={'最短退出年限'}>
                {getFieldDecorator('withdrawal_year', {
                  initialValue: target
                    ? target.withdrawal_year
                      ? target.withdrawal_year.id
                      : null
                    : null,
                  rules: [{ required: true, message: '请选择最短退出年限' }],
                })(
                  <Select
                    disabled={disabled}
                    style={{ width: 200 }}
                    placeholder="请选择最短退出年限"
                  >
                    {withdrawal_year.map(item => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.title}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label={'占股比例'}>
                {getFieldDecorator('ratio', {
                  initialValue: target ? (target.ratio ? target.ratio.id : null) : null,
                  rules: [{ required: true, message: '请选择占股比例' }],
                })(
                  <Select disabled={disabled} style={{ width: 200 }} placeholder="请选择占股比例">
                    {ratio.map(item => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.title}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label={'退出方式'}>
                {getFieldDecorator('exit_mode', {
                  initialValue: target
                    ? target.exit_mode
                      ? target.exit_mode.map(item => item.id)
                      : null
                    : null,
                  rules: [{ required: true, message: '请选择退出方式' }],
                })(
                  <Checkbox.Group
                    disabled={disabled}
                    options={exit_mode.map(item => ({
                      label: item.title,
                      value: item.id,
                    }))}
                  />,
                )}
              </Form.Item>
            </>
          ) : null}

          {IFModeEnum.CLAIM === category ? (
            <>
              <Form.Item {...formItemLayout} label={'风控要求'}>
                {getFieldDecorator('risk', {
                  initialValue: target ? (target.risk ? target.risk.id : null) : null,
                  rules: [{ required: true, message: '请选择风控要求' }],
                })(
                  <Select disabled={disabled} style={{ width: 200 }} placeholder="请选择风控要求">
                    {risk.map(item => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.title}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label={'还款来源'}>
                {getFieldDecorator('payment', {
                  initialValue: target ? target.payment : null,
                })(
                  <Input disabled={disabled} style={{ width: 200 }} placeholder="请填写还款来源" />,
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label={'承担利息'}>
                {getFieldDecorator('interest', {
                  initialValue: target ? (target.interest ? target.interest.id : null) : null,
                  rules: [{ required: true, message: '请选择承担利息' }],
                })(
                  <Select disabled={disabled} style={{ width: 200 }} placeholder="请选择承担利息">
                    {interest.map(item => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.title}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label={'资金占用时长'}>
                {getFieldDecorator('occupancy_time', {
                  initialValue: target
                    ? target.occupancy_time
                      ? target.occupancy_time.id
                      : null
                    : null,
                  rules: [{ required: true, message: '请选择资金占用时长' }],
                })(
                  <Select
                    disabled={disabled}
                    style={{ width: 200 }}
                    placeholder="请选择资金占用时长"
                  >
                    {occupancy_time.map(item => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.title}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            </>
          ) : null}

          <Form.Item {...formItemLayout} label={'融资用途'}>
            {getFieldDecorator('purposes', {
              initialValue: target ? target.purposes : null,
              rules: [{ required: true, message: '请填写融资用途' }],
            })(<TextArea disabled={disabled} rows={5} placeholder="请填写融资用途" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label={'团队介绍'}>
            {getFieldDecorator('team_info', {
              initialValue: target ? target.team_info : null,
            })(<TextArea disabled={disabled} rows={5} placeholder="请填写团队介绍" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label={'项目优势'}>
            {getFieldDecorator('advantage', {
              initialValue: target ? target.advantage : null,
            })(<TextArea disabled={disabled} rows={5} placeholder="请填写项目优势" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label={'项目进展'}>
            {getFieldDecorator('progress', {
              initialValue: target ? target.progress : null,
              rules: [{ required: true, message: '标题' }],
            })(<TextArea disabled={disabled} rows={5} placeholder="请填写项目进展" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label={'项目介绍'}>
            {getFieldDecorator('info', {
              initialValue: target ? target.info : null,
              rules: [{ required: true, message: '请填写项目介绍' }],
            })(<TextArea disabled={disabled} rows={5} placeholder="请填写项目介绍" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label={'可提供资料'}>
            {getFieldDecorator('data', {
              initialValue: target ? (target.data ? target.data.map(item => item.id) : null) : null,
              rules: [{ required: true, message: '请选择可提供资料' }],
            })(
              <Checkbox.Group
                disabled={disabled}
                options={data.map(item => ({
                  label: item.title,
                  value: item.id,
                }))}
              />,
            )}
          </Form.Item>
        </Col>
      </Row>
      <Form.Item {...submitFormLayout}>
        <Button disabled={disabled} type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
});

export default withRouter(props => {
  const {
    match: {
      params: { id },
    },
  } = props;

  const [tabKey, setTabKey] = useState('detail');

  const [areaList, setAreaList] = useState([]);
  const [area, setArea] = useState([]);

  const [target, setTarget] = useState(null);
  const [category, setCategory] = useState(IFModeEnum.EQUITY);
  const [cover, setCover] = useState(null);

  const [loading, setLoading] = useState(true);

  const client = useApolloClient();

  useEffect(() => {
    (async () => {
      const list = await getAreaList(client);
      setAreaList(list);

      if (!!id) {
        const result = await client.query({
          query: Q_GET_PROJECT,
          notifyOnNetworkStatusChange: true,
          fetchPolicy: 'no-cache',
          variables: { id },
        });

        const { project } = result.data;
        setLoading(result.loading);
        setTarget(project);
        setCategory(project.category);
        setCover(project.cover);

        const areas =
          project && project.area
            ? toGetParentArrayByChildNode(list, { id: project.area.id })
            : null;

        setArea(areas ? areas.map(item => item.id) : null);
      } else {
        setLoading(false);
      }
    })();
  }, [id]);

  const [createProject] = useMutation(M_CREATE_PROJECT, {
    update: (proxy, { data }) => {
      if (data && data.createProject) {
        message.success('保存成功');
        router.goBack();
      }
    },
  });

  const [updateProject] = useMutation(M_UPDATE_PROJECT, {
    update: (proxy, { data }) => {
      if (data) {
        message.success('保存成功');
        router.goBack();
      }
    },
  });

  const mutation = id ? updateProject : createProject;

  const onUpload = async file => {
    const res = await uploadOne(file);

    if (!!res && res.relativePath) {
      setCover(res.relativePath);
    }
  };

  let tabList = {
    detail: {
      name: '详细信息',
      render: () => (
        <DetailForm
          target={target || {}}
          mutation={mutation}
          cover={cover}
          setCover={setCover}
          area={area}
          category={category}
          areaList={areaList}
          setCategory={setCategory}
        />
      ),
    },
  };

  return (
    <PageHeaderWrapper
      title={target ? '编辑' : '新增'}
      extra={action}
      className={styles.pageHeader}
      content={null}
      extraContent={null}
    >
      <div className={styles.main}>
        <GridContent>
          <StandardTabList
            loading={loading}
            activeTabKey={tabKey}
            onActiveTabKeyChange={key => setTabKey(key)}
            tabList={tabList}
          />
        </GridContent>
      </div>
    </PageHeaderWrapper>
  );
});
