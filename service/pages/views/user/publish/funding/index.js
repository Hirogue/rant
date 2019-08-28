import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { withRouter } from 'next/router';
import { Row, Col, Form, Input, Button, Alert, Modal, message } from 'antd';

import { initTree } from '../../../../lib/tree';

import TreeTags from '../../../../components/TreeTags';
import LoginContext from '../../../../components/context/LoginContext';
import UserLayout from '../../../../components/Layout/UserLayout';
import { apiPublishProject, apiUpdateProject } from '../../../../services/common';

import './releas_fund.scss';

@Form.create()
@withRouter
export default class extends React.Component {
	handleSubmit = (e, user) => {
		e.preventDefault();

		const { detail } = this.props.router.query;

		const title = this.titleRef.state.value;

		if (!title) {
			message.error('标题必填');
			return false;
		}

		if (title.length > 35) {
			message.error('标题长度不能超过35个字符');
			return false;
		}

		const tags = this.tagRootRef.generateResult();

		if (!!tags.errors) {
			message.error(tags.errors.shift());
			return false;
		}

		const plainText = tags.selectedTags['资金详情'].value;
		const subtitle = plainText.length >= 120 ? plainText.substr(0, 100) + '...' : plainText;

		const payload = {
			title,
			subtitle,
			ex_info: { tags: JSON.stringify(tags) },
			category: 'PRJ_INVESTMENT',
			created_by: user.id,
			contacts: user.real_name,
			phone: user.phonenumber,
			company: user.nick_name,
			release_datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
			status: 'PENDING'
		};

		if (!!detail.id) {
			apiUpdateProject({
				criteria: {
					id: detail.id
				},
				newvalue: payload
			})
				.then((res) => {
					message.success('提交成功！');
					window.location.replace('/user/funding');
				})
				.catch((err) => message.error('提交失败！'));
		} else {
			apiPublishProject(payload)
				.then((res) => {
					message.success('发布成功！');
					window.location.replace('/user/funding');
				})
				.catch((err) => message.error('发布失败！'));
		}
	};

	render() {
		const { detail } = this.props.router.query;

		return (
			<UserLayout>
				<LoginContext.Consumer>
					{(context) => {
						const user = context.user;

						const { mainData } = context;
						if (!mainData) return '';

						const treeRoot = initTree(mainData.fundingTags);
						const tagRoot = _.find(treeRoot, (item) => item.name === '资金');
						const tagString = !detail.ex_info ? null : detail.ex_info.tags;

						const rowStyle = {
							margin: '5px 0',
							padding: '5px',
							borderBottom: '1px dashed #e8e8e8'
						};

						return (
							<div className="releas-fund">
								<Modal
									title="提示"
									centered
									keyboard={false}
									maskClosable={false}
									closable={false}
									footer={null}
									visible={user.vip <= 0}
								>
									<p style={{ textAlign: 'center' }}>如需发布资金，请先完善资料升级 VIP 等级</p>
									<p style={{ textAlign: 'center', marginTop: 20 }}>
										<Button type="primary" onClick={() => (window.location.href = '/user')}>
											立即升级
										</Button>
									</p>
								</Modal>
								<p className="right-title">发布资金</p>
								{!!detail && detail.status === 'REJECT' ? (
									<Alert message="已驳回" description={'驳回理由：' + detail.reject_msg} type="error" />
								) : (
									''
								)}
								<Form className="form-main" onSubmit={(e) => this.handleSubmit(e, user)}>
									<Row>
										<Col>
											<div style={rowStyle}>
												<div
													style={{
														marginRight: 15,
														textAlign: 'right',
														verticalAlign: 'top',
														display: 'inline-block',
														width: '15%',
														color: '#108ee9'
													}}
												>
													<span style={{ color: 'red', marginRight: '2px' }}>*</span>标题：
												</div>

												<div style={{ display: 'inline-block', width: '80%' }}>
													<Input
														ref={(e) => (this.titleRef = e)}
														defaultValue={detail.title}
														style={{ width: 500 }}
														placeholder="请填写标题"
													/>
													<div style={{ marginTop: 3, color: 'red' }}>
														参考格式：寻+（省级）投资地区+（行业）项目+合作方式+（市级）资金所在地+资金主体+金额
													</div>
												</div>
											</div>

											<TreeTags
												ref={(e) => (this.tagRootRef = e)}
												tagGroups={tagRoot}
												tagString={tagString}
												categoryName={'投资方式'}
											/>
										</Col>
									</Row>

									<Form.Item>
										<Button type="primary" htmlType="submit">
											{!!detail.id ? '重新提交' : '立即发布'}
										</Button>
									</Form.Item>
								</Form>
							</div>
						);
					}}
				</LoginContext.Consumer>
			</UserLayout>
		);
	}
}
