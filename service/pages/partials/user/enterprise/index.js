import React, { Fragment } from 'react';
import { Row, Col, Form, Select, Input, Button, Upload, Icon, message } from 'antd';
import LoginContext from '../../../components/context/LoginContext';
import { apiUpdateUserInfo, uploadFile } from '../../../services/common';

import './index.scss';

const Option = Select.Option;

@Form.create()
export default class extends React.Component {
	state = {
		org_img: null
	};

	constructor(props) {
		super(props);
	}

	handleSubmit = (e, user) => {
		e.preventDefault();

		const { idName } = this.props;
		const org_img = this.state.org_img || user.org_img;

		if (!org_img) {
			message.error('请上传营业执照照片');
			return false;
		}
		if (user.id_name === '游客') {
			if (idName !== '项目方' && idName !== '资金方' && idName !== '服务商') {
				message.error('请选择会员身份');
				return false;
			}
		}

		this.props.form.validateFields((err, values) => {
			if (!!err) {
				return false;
			}

			const payload = {
				id_type: '企业',
				id_name: user.id_name === '游客' ? idName : user.id_name,
				status: 'PENDING',
				org_img,
				...values
			};

			apiUpdateUserInfo(payload).then(() => {
				window.location.reload();
			});
		});
	};

	normFile = (e) => {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};

	render() {
		const { area } = this.props;
		const { getFieldDecorator } = this.props.form;

		return (
			<LoginContext.Consumer>
				{(context) => {
					const user = context.user;

					if (!user) return '';

					const org_img = this.state.org_img || user.org_img;

					return (
						<Row>
							<Col span={16}>
								<Form onSubmit={(e) => this.handleSubmit(e, user)}>
									<Form.Item label={'企业全称：'}>
										{getFieldDecorator('nick_name', {
											initialValue: user.nick_name,
											rules: [ { required: true, message: '企业全称', whitespace: true } ]
										})(<Input disabled={!!user.vip} />)}
									</Form.Item>
									<Form.Item label={'统一社会信用代码：'}>
										{getFieldDecorator('org_name', {
											initialValue: user.org_name,
											rules: [
												{ required: true, message: '统一社会信用代码', whitespace: true },
												{
													pattern: /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/g,
													message: '格式不正确'
												}
											]
										})(<Input disabled={!!user.vip} />)}
									</Form.Item>
									<Form.Item label="所在地区：" hasFeedback>
										{getFieldDecorator('area', {
											initialValue: user.area,
											rules: [ { required: true, message: '请选择所在地区' } ]
										})(
											<Select
												disabled={!!user.vip}
												placeholder="请选择所在地区"
												style={{ width: 120, marginRight: 10 }}
											>
												{!!area &&
													area.map((item, index) => (
														<Option value={item} key={index}>
															{item}
														</Option>
													))}
											</Select>
										)}
									</Form.Item>
									{/* <Form.Item label="营业执照照片">
										<Upload
											action={null}
											showUploadList={false}
											beforeUpload={(file) =>
												uploadFile(file).then((res) => {
													this.setState((state) => ({
														...state,
														org_img: res
													}));
												})}
										>
											<Button>
												<Icon type="upload" /> 请上传图片
											</Button>
										</Upload>
									</Form.Item> */}
									<Form.Item label={'联系人姓名：'}>
										{getFieldDecorator('real_name', {
											initialValue: user.real_name,
											rules: [ { required: true, message: '联系人姓名', whitespace: true } ]
										})(<Input disabled={!!user.vip} />)}
									</Form.Item>
									<Form.Item label={'联系电话'}>
										{getFieldDecorator('phonenumber', {
											initialValue: user.phonenumber,
											rules: [
												{ required: true, message: '联系电话', whitespace: true },
												{
													pattern: /^1[34578]\d{9}$/,
													message: '格式不正确'
												}
											]
										})(<Input disabled={!!user.vip} />)}
									</Form.Item>
									<Form.Item>
										{user.status === 'FOLLOW' ? (
											<Button type="primary" htmlType="submit">
												保存资料
											</Button>
										) : (
											''
										)}
										{user.status === 'REJECT' ? (
											<Button type="primary" htmlType="submit">
												重新提交
											</Button>
										) : (
											''
										)}
										{user.status === 'PENDING' ? (
											<Button disabled={true} type="primary" htmlType="submit">
												正在审核中
											</Button>
										) : (
											''
										)}
										{user.status === 'OVER' ? (
											<Button disabled={true} type="primary" htmlType="submit">
												审核已通过
											</Button>
										) : (
											''
										)}
									</Form.Item>
								</Form>
							</Col>
							<Col span={4}>
								<Upload
									action={null}
									showUploadList={false}
									beforeUpload={(file) => {
										if (file.size > 2 * 1024 * 1024) {
											message.error('请上传小于2M的图片');
											return false;
										}
										uploadFile(file).then((res) => {
											this.setState((state) => ({
												...state,
												org_img: res
											}));
										});
									}}
								>
									<div className="upload-org">
										{!!org_img && !!org_img.url ? (
											<Fragment>
												<img style={{ maxWidth: 300 }} src={org_img.url} />
												<Button disabled={!!user.vip} className="upload-btn">
													<Icon type="upload" />重新上传
												</Button>
											</Fragment>
										) : (
											<Fragment>
												<p className="ant-upload-drag-icon" style={{ width: 300 }}>
													<Icon type="upload" />
												</p>
												<p className="ant-upload-text">点击上传营业执照电子版</p>
												<p className="ant-upload-hint">图片大小不超过2M</p>
											</Fragment>
										)}
									</div>
								</Upload>
							</Col>
						</Row>
					);
				}}
			</LoginContext.Consumer>
		);
	}
}
