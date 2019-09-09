import { Alert, Col, Form, Input, Row, Button } from 'antd';
import React from 'react';
import UserLayout from '../../../../components/Layout/UserLayout';
import { uploadOne } from '../../../../lib/fetch';
import './releas_project.scss';
import ImageCropper from '../../../../components/ImageCropper';

export default Form.create()(props => {

	const { form } = props;
	const { getFieldDecorator } = form;

	const rowStyle = {
		margin: '5px 0',
		padding: '5px',
		borderBottom: '1px dashed #e8e8e8'
	};

	const onUpload = async (file) => {
		const res = await uploadOne(file);

		if (!!res && res.relativePath) {

		}
	};

	return (
		<UserLayout>
			<div className="releas-fund">
				<p className="right-title">发布项目</p>
				<Alert message="已驳回" description={'驳回理由：'} type="error" />
				<Form className="form-main" onSubmit={(e) => {
					e.preventDefault();

					form.validateFields((err, values) => {
						if (!!err) {
							return false;
						}
					});
				}}>
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
									<Form.Item >
										{getFieldDecorator('title', {
											initialValue: '',
											rules: [{ required: true, message: '标题', whitespace: true }]
										})(<Input style={{ width: 500 }} placeholder="请填写标题" />)}
									</Form.Item>
									<div style={{ marginTop: 3, color: 'red' }}>
										参考格式：地区+某行业项目+融资方式+金额（附单位）
 									</div>
								</div>
							</div>
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
									<span style={{ color: 'red', marginRight: '2px' }}>*</span>项目封面：
 								</div>
								<div style={{ display: 'inline-block', width: '80%' }}>
									<ImageCropper
										title='请上传项目封面'
										url={''}
										onUpload={file => {
											if (file.size > 5 * 1024 * 1024) {
												message.error('请上传小于5M的图片');
												return false;
											}

											// onUploadLogo(file);
											return false;
										}}
										width={400}
										height={200}
									/>
								</div>
							</div>
						</Col>
					</Row>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							立即发布
						</Button>
					</Form.Item>
				</Form>
			</div>
		</UserLayout>
	)
});

			// import _ from 'lodash';
			// import moment from 'moment';
			// // import dynamic from 'next/dynamic';
// import {withRouter} from 'next/router';
// import {Row, Col, Form, Modal, Input, Button, Upload, Icon, Alert, message } from 'antd';

// import {initTree} from '../../../../lib/tree';

				// import TreeTags from '../../../../components/TreeTags';
				// import ImageCropper from '../../../../components/ImageCropper';
				// import LoginContext from '../../../../components/context/LoginContext';
				// import UserLayout from '../../../../components/Layout/UserLayout';
// import {apiPublishProject, apiUpdateProject, uploadFile } from '../../../../services/common';



				// @Form.create()
				// @withRouter
// export default class extends React.Component {
// 	state = {
// 		thumbnail: null
// 	};

// 	componentDidMount() {
// 		const { detail } = this.props.router.query;

// 		this.setState((state) => ({
// 			...state,
// 			thumbnail: detail.thumbnail
// 		}));
// 	}

// 	handleSubmit = (e, user) => {
// 		e.preventDefault();

// 		const { detail } = this.props.router.query;

// 		const title = this.titleRef.state.value;

// 		if (!title) {
// 			message.error('标题必填');
// 			return false;
// 		}

// 		if (title.length > 35) {
// 			message.error('标题长度不能超过35个字符');
// 			return false;
// 		}

// 		const thumbnail = this.state.thumbnail;
// 		if (!thumbnail) {
// 			message.error('请上传项目封面');
// 			return false;
// 		}

// 		const tags = this.tagRootRef.generateResult();

// 		if (!!tags.errors) {
// 			message.error(tags.errors.shift());
// 			return false;
// 		}

// 		const plainText = tags.selectedTags['项目介绍'].value;
// 		const subtitle = plainText.length >= 120 ? plainText.substr(0, 100) + '...' : plainText;

// 		const payload = {
// 			title,
// 			subtitle,
// 			thumbnail,
// 			ex_info: { tags: JSON.stringify(tags) },
// 			category: 'PRJ_FINANCING',
// 			created_by: user.id,
// 			contacts: user.real_name,
// 			phone: user.phonenumber,
// 			company: user.nick_name,
// 			release_datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
// 			status: 'PENDING'
// 		};

// 		if (!!detail.id) {
// 			apiUpdateProject({
// 				criteria: {
// 					id: detail.id
// 				},
// 				newvalue: payload
// 			})
// 				.then((res) => {
// 					message.success('提交成功！');
// 					window.location.replace('/user/project');
// 				})
// 				.catch((err) => message.error('提交失败！'));
// 		} else {
// 			apiPublishProject(payload)
// 				.then((res) => {
// 					message.success('发布成功！');
// 					window.location.replace('/user/project');
// 				})
// 				.catch((err) => message.error('发布失败！'));
// 		}
// 	};

// 	render() {
// 		// const { getFieldDecorator } = this.props.form;
// 		const { detail } = this.props.router.query;

// 		// const html = !!detail.ex_info ? (!!detail.ex_info.richtext ? detail.ex_info.richtext.html : null) : null;
// 		const thumbnail = this.state.thumbnail || null;

// 		return (
// 			<UserLayout>
// 				<LoginContext.Consumer>
// 					{(context) => {
// 						const user = context.user;
// 						if (!user) return '';

// 						const { mainData } = context;
// 						if (!mainData) return '';

// 						const treeRoot = initTree(mainData.projectTags);
// 						const tagRoot = _.find(treeRoot, (item) => item.name === '项目');
// 						const tagString = !detail.ex_info ? null : detail.ex_info.tags;

// 						const rowStyle = {
// 							margin: '5px 0',
// 							padding: '5px',
// 							borderBottom: '1px dashed #e8e8e8'
// 						};

// 						return (
// 							<div className="releas-fund">
// 								<Modal
// 									title="提示"
// 									centered
// 									keyboard={false}
// 									maskClosable={false}
// 									closable={false}
// 									footer={null}
// 									visible={user.vip <= 0}
// 								>
// 									<p style={{ textAlign: 'center' }}>如需发布项目，请先完善资料升级 VIP 等级</p>
// 									<p style={{ textAlign: 'center', marginTop: 20 }}>
// 										<Button type="primary" onClick={() => (window.location.href = '/user')}>
// 											立即升级
// 										</Button>
// 									</p>
// 								</Modal>
// 								<p className="right-title">发布项目</p>
// 								{!!detail && detail.status === 'REJECT' ? (
// 									<Alert message="已驳回" description={'驳回理由：' + detail.reject_msg} type="error" />
// 								) : (
// 										''
// 									)}
// 								<Form className="form-main" onSubmit={(e) => this.handleSubmit(e, user)}>
// 									<Row>
// 										<Col>
// 											<div style={rowStyle}>
// 												<div
// 													style={{
// 														marginRight: 15,
// 														textAlign: 'right',
// 														verticalAlign: 'top',
// 														display: 'inline-block',
// 														width: '15%',
// 														color: '#108ee9'
// 													}}
// 												>
// 													<span style={{ color: 'red', marginRight: '2px' }}>*</span>标题：
// 												</div>

// 												<div style={{ display: 'inline-block', width: '80%' }}>
// 													<Input
// 														ref={(e) => (this.titleRef = e)}
// 														defaultValue={detail.title}
// 														style={{ width: 500 }}
// 														placeholder="请填写标题"
// 													/>

// 													<div style={{ marginTop: 3, color: 'red' }}>
// 														参考格式：地区+某行业项目+融资方式+金额（附单位）
// 													</div>
// 												</div>
// 											</div>

// 											<div style={rowStyle}>
// 												<div
// 													style={{
// 														marginRight: 15,
// 														textAlign: 'right',
// 														verticalAlign: 'top',
// 														display: 'inline-block',
// 														width: '15%',
// 														color: '#108ee9'
// 													}}
// 												>
// 													<span style={{ color: 'red', marginRight: '2px' }}>*</span>项目封面：
// 												</div>
// 												<div style={{ display: 'inline-block', width: '80%' }}>
// 													<ImageCropper
// 														imageUrl={!thumbnail ? '' : thumbnail.url}
// 														onUpload={(file) => {
// 															if (file.size > 5 * 1024 * 1024) {
// 																message.error('请上传小于5M的图片');
// 																return false;
// 															}
// 															uploadFile(file).then((res) => {
// 																this.setState((state) => ({
// 																	...state,
// 																	thumbnail: res
// 																}));
// 															});
// 														}}
// 													/>
// 													{/* <Upload
// 														action={null}
// 														showUploadList={false}
// 														beforeUpload={(file) => {
// 															if (file.size > 2 * 1024 * 1024) {
// 																message.error('请上传小于2M的图片');
// 																return false;
// 															}
// 															uploadFile(file).then((res) => {
// 																this.setState((state) => ({
// 																	...state,
// 																	thumbnail: res
// 																}));
// 															});
// 														}}
// 													>
// 														<div className="upload-org">
// 															{!!thumbnail && !!thumbnail.url ? (
// 																<Fragment>
// 																	<img
// 																		style={{ maxWidth: 400 }}
// 																		src={thumbnail.url}
// 																	/>
// 																	<Button className="upload-btn">
// 																		<Icon type="upload" />重新上传
// 																	</Button>
// 																</Fragment>
// 															) : (
// 																<Fragment>
// 																	<p
// 																		className="ant-upload-drag-icon"
// 																		style={{ width: 300 }}
// 																	>
// 																		<Icon type="upload" />
// 																	</p>
// 																	<p className="ant-upload-text">点击上传项目封面图</p>
// 																	<p className="ant-upload-hint">图片大小不超过2M</p>
// 																</Fragment>
// 															)}
// 														</div>
// 													</Upload> */}
// 												</div>
// 											</div>

// 											<TreeTags
// 												ref={(e) => (this.tagRootRef = e)}
// 												tagGroups={tagRoot}
// 												tagString={tagString}
// 												categoryName={'融资方式'}
// 												company={user.id_type === '企业'}
// 											/>
// 										</Col>
// 									</Row>

// 									{/* <Form.Item label={'项目介绍：'}>{this.renderRichText(html)}</Form.Item> */}

// 									<Form.Item>
// 										<Button type="primary" htmlType="submit">
// 											{!!detail.id ? '重新提交' : '立即发布'}
// 										</Button>
// 									</Form.Item>
// 								</Form>
// 							</div>
// 						);
// 					}}
// 				</LoginContext.Consumer>
// 			</UserLayout>
// 		);
// 	}
// }
// 