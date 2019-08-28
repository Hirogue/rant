import React from 'react';
import _ from 'lodash';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { Form, Select, Input, Button, Upload, Icon, Alert, message } from 'antd';
import UserLayout from '../../../components/Layout/UserLayout';
import ImageCropper from '../../../components/ImageCropper';
import { apiPublishService, apiUpdateService, uploadFile } from '../../../services/common';

import 'braft-editor/dist/index.css';

import './releas_project.scss';
import LoginContext from '../../../components/context/LoginContext';
const Option = Select.Option;

@Form.create()
@withRouter
export default class extends React.Component {
	state = {
		thumbnail: null
	};

	componentDidMount() {
		const { detail } = this.props.router.query;
		console.log(detail);

		this.setState((state) => ({
			...state,
			thumbnail: !!detail ? detail.thumbnail : ''
		}));
	}

	handleSubmit = (e, user) => {
		e.preventDefault();

		const { detail } = this.props.router.query;

		const html = this.editor.getValue().toHTML();
		const plainText = !!html ? html.replace(new RegExp('<.+?>', 'g'), '') : '';
		const subtitle = plainText.length >= 120 ? plainText.substr(0, 100) + '...' : plainText;

		if (!html) {
			message.error('请填写详细信息');
			return false;
		}

		this.setState((state) => ({
			...state,
			html
		}));

		const thumbnail = this.state.thumbnail;
		if (!thumbnail) {
			message.error('请上传图标');
			return false;
		}

		this.props.form.validateFields((err, values) => {
			if (!err) {
				// console.log('Received values of form: ', values);

				const payload = {
					...values,
					subtitle,
					thumbnail,
					ex_info: { richtext: { html } },
					created_by: user.id,
					contacts: user.real_name,
					phone: user.phonenumber,
					area: user.area,
					status: 'PENDING'
				};

				if (!!detail && !!detail.id) {
					apiUpdateService({
						criteria: {
							id: detail.id
						},
						newvalue: payload
					})
						.then((res) => {
							message.success('提交成功！');
							window.location.reload();
						})
						.catch((err) => message.error('提交失败！'));
				} else {
					apiPublishService(payload)
						.then((res) => {
							message.success('发布成功！');
							window.location.reload();
						})
						.catch((err) => message.error('发布失败！'));
				}
			}
		});
	};

	renderRichText = (html) => {
		const editorProps = {
			placeholder: '请输入内容',
			contentFormat: 'html',
			contentId: 'editor',
			onSave: () => {
				this.setState((state) => ({
					...state,
					html: this.editor.getValue().toHTML()
				}));
			},
			media: {
				uploadFn: async (context) => {
					if (!context || !context.file) return;

					const result = await uploadFile(context.file);
					if (result instanceof Error) {
						console.error('BraftEditor upload error: ', err);
						context.error({ error: err });
					} else {
						context.progress(101);
						context.success({ url: result.url });
					}
				}
			}
		};

		const DynamicEditor = dynamic(import('braft-editor'), {
			ssr: false,
			render: (cmp, props) => {
				const Editor = cmp.default;

				return <Editor ref={(e) => (this.editor = e)} {...props} value={Editor.createEditorState(html)} />;
			}
		});

		return <DynamicEditor {...editorProps} />;
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const detail = this.props.router.query.detail || {};
		const thumbnail = this.state.thumbnail || {};
		const html = !!detail.ex_info ? (!!detail.ex_info.richtext ? detail.ex_info.richtext.html : null) : null;

		return (
			<UserLayout>
				<LoginContext.Consumer>
					{(context) => {
						const user = context.user;
						if (!user) return '';

						const { mainData } = context;
						if (!mainData) return '';

						const servicesTags = mainData.services;

						return (
							<div className="releas-fund">
								<p className="right-title">服务商入驻</p>
								{!!detail && detail.status === 'REJECT' ? (
									<Alert message="已驳回" description={'驳回理由：' + detail.reject_msg} type="error" />
								) : (
									''
								)}
								{!!detail && detail.status === 'PENDING' ? (
									<Alert message="审核中" description="请等待工作人员审核" type="info" />
								) : (
									''
								)}
								{!!detail && detail.status === 'OVER' ? (
									<Alert message="已审核" description="修改信息后需要重新审核" type="success" />
								) : (
									''
								)}
								<Form className="form-main" onSubmit={(e) => this.handleSubmit(e, user)}>
									<Form.Item label={'名称'}>
										{getFieldDecorator('name', {
											initialValue: detail.name,
											rules: [
												{ required: true, message: '请填写名称' },
												{
													max: 35,
													message: '名称不超过35个字符'
												}
											]
										})(<Input placeholder="请填写名称" />)}
									</Form.Item>
									<Form.Item label={'简称'}>
										{getFieldDecorator('title', {
											initialValue: detail.title,
											rules: [
												{ required: true, message: '请填写简称' },
												{
													max: 120,
													message: '简称不超过120个字符'
												}
											]
										})(<Input placeholder="请填写简称" />)}
									</Form.Item>
									<Form.Item label={'分类：'}>
										{getFieldDecorator('category', {
											initialValue: !!detail.category ? detail.category : '',
											rules: [ { required: true, message: '请选择分类' } ]
										})(
											<Select placeholder="请选择分类" style={{ width: 140, marginRight: 10 }}>
												{servicesTags.map((item, index) => (
													<Option value={item.name} key={index}>
														{item.name}
													</Option>
												))}
											</Select>
										)}
									</Form.Item>
									<Form.Item label="图标">
										<ImageCropper
											imageUrl={!thumbnail ? '' : thumbnail.url}
											onUpload={(file) => {
												if (file.size > 2 * 1024 * 1024) {
													message.error('请上传小于2M的图片');
													return false;
												}
												uploadFile(file).then((res) => {
													this.setState((state) => ({
														...state,
														thumbnail: res
													}));
												});
											}}
											width={190}
											height={80}
										/>
										{/* <Upload
											action={null}
											showUploadList={false}
											beforeUpload={(file) =>
												uploadFile(file).then((res) => {
													this.setState((state) => ({
														...state,
														thumbnail: res
													}));
												})}
										>
											{!!thumbnail && !!thumbnail.url ? (
												<img style={{ maxWidth: 400 }} src={thumbnail.url} />
											) : (
												<Button>
													<Icon type="upload" /> 请上传图片
												</Button>
											)}
										</Upload> */}
									</Form.Item>
									<Form.Item label={'企业介绍：'}>{this.renderRichText(html)}</Form.Item>

									<Form.Item>
										<Button type="primary" htmlType="submit">
											{!!detail.id ? '重新提交' : '立即入驻'}
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
