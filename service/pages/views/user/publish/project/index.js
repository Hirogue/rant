import { useQuery } from '@apollo/react-hooks';
import { Alert, Button, Checkbox, Col, Form, Input, InputNumber, Radio, Row, Select } from 'antd';
import React, { useState } from 'react';
import ImageCropper from '../../../../components/ImageCropper';
import UserLayout from '../../../../components/Layout/UserLayout';
import withContext from '../../../../components/Layout/withContext';
import { IFModeEnum } from '../../../../lib/enum';
import { uploadOne } from '../../../../lib/fetch';
import { Q_GET_PROJECT_METADATA } from '../gql';
import './releas_project.scss';

const { TextArea } = Input;

export default withContext((Form.create()(props => {

	const { data: {
		industry = [],
		area = [],
		stage = [],
		withdrawal_year = [],
		ratio = [],
		risk = [],
		interest = [],
		occupancy_time = [],
		exit_mode = [],
		data = []
	} } = useQuery(Q_GET_PROJECT_METADATA, {
		notifyOnNetworkStatusChange: true
	});

	const [category, setCategory] = useState(IFModeEnum.EQUITY);

	const { form } = props;
	const { getFieldDecorator } = form;

	const rowStyle = {
		margin: '5px 0',
		padding: '5px',
		borderBottom: '1px dashed #e8e8e8'
	};

	const labelStyle = {
		marginRight: 15,
		textAlign: 'right',
		verticalAlign: 'top',
		display: 'inline-block',
		width: '15%',
		color: '#108ee9'
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
									style={labelStyle}
								>
									<span style={{ color: 'red', marginRight: '2px' }}>*</span>标题：
 								</div>
								<div style={{ display: 'inline-block', width: '80%' }}>
									<Form.Item >
										{getFieldDecorator('title', {
											initialValue: '',
											rules: [
												{ required: true, message: '请填写标题', whitespace: true },
												{ max: 35, message: '最多35个字符' },
												{ min: 5, message: '最少5个字符' },
											]
										})(<Input style={{ width: 500 }} placeholder="请填写标题" />)}
									</Form.Item>
									<div style={{ marginTop: 3, color: 'red' }}>
										参考格式：地区+某行业项目+融资方式+金额（附单位）
 									</div>
								</div>
							</div>
							<div style={rowStyle}>
								<div style={labelStyle}>
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

											onUpload(file);
											return false;
										}}
										width={400}
										height={200}
									/>
								</div>
							</div>
							<div style={rowStyle}>
								<div style={labelStyle}>
									<span style={{ color: 'red', marginRight: '2px' }}>*</span>融资金额：
 								</div>
								<div style={{ display: 'inline-block', width: '80%' }}>
									{getFieldDecorator('amount', {
										initialValue: '',
										rules: [
											{ required: true, message: '请填写融资金额' }
										]
									})(<InputNumber min={1} style={{ width: 200 }} placeholder="请填写融资金额" />)}
									{' '}万元
								</div>
							</div>
							<div style={rowStyle}>
								<div style={labelStyle}>
									<span style={{ color: 'red', marginRight: '2px' }}>*</span>所属行业：
 								</div>
								<div style={{ display: 'inline-block', width: '80%' }}>
									{getFieldDecorator('industry', {
										initialValue: '',
										rules: [
											{ required: true, message: '请选择所属行业' }
										]
									})(<Select
										style={{ width: 200 }}
										placeholder="请选择所属行业">
										{industry.map(item =>
											<Select.Option key={item.id} value={item.id}>
												{item.title}
											</Select.Option>
										)}
									</Select>)}
								</div>
							</div>
							<div style={rowStyle}>
								<div style={labelStyle}>
									<span style={{ color: 'red', marginRight: '2px' }}>*</span>所在地区：
 								</div>
								<div style={{ display: 'inline-block', width: '80%' }}>
									{getFieldDecorator('area', {
										initialValue: '',
										rules: [
											{ required: true, message: '请选择所在地区' }
										]
									})(<Select
										style={{ width: 200 }}
										placeholder="请选择所在地区">
										{area.map(item =>
											<Select.Option key={item.id} value={item.id}>
												{item.title}
											</Select.Option>
										)}
									</Select>)}
								</div>
							</div>
							<div style={rowStyle}>
								<div style={labelStyle}>
									融资方式：
 								</div>
								<div style={{ display: 'inline-block', width: '80%' }}>
									<Radio.Group onChange={e => setCategory(e.target.value)} value={category}>
										<Radio value={IFModeEnum.EQUITY}>股权</Radio>
										<Radio value={IFModeEnum.CLAIM}>债权</Radio>
									</Radio.Group>
								</div>
							</div>

							{IFModeEnum.EQUITY === category ?
								<>
									<div style={rowStyle}>
										<div style={labelStyle}>
											<span style={{ color: 'red', marginRight: '2px' }}>*</span>所处阶段：
 									</div>
										<div style={{ display: 'inline-block', width: '80%' }}>
											{getFieldDecorator('stage', {
												initialValue: '',
												rules: [
													{ required: true, message: '请选择所处阶段' }
												]
											})(<Select
												style={{ width: 200 }}
												placeholder="请选择所处阶段">
												{stage.map(item =>
													<Select.Option key={item.id} value={item.id}>
														{item.title}
													</Select.Option>
												)}
											</Select>)}
										</div>
									</div>
									<div style={rowStyle}>
										<div style={labelStyle}>
											<span style={{ color: 'red', marginRight: '2px' }}>*</span>最短退出年限：
 									</div>
										<div style={{ display: 'inline-block', width: '80%' }}>
											{getFieldDecorator('withdrawal_year', {
												initialValue: '',
												rules: [
													{ required: true, message: '请选择最短退出年限' }
												]
											})(<Select
												style={{ width: 200 }}
												placeholder="请选择最短退出年限">
												{withdrawal_year.map(item =>
													<Select.Option key={item.id} value={item.id}>
														{item.title}
													</Select.Option>
												)}
											</Select>)}
										</div>
									</div>
									<div style={rowStyle}>
										<div style={labelStyle}>
											<span style={{ color: 'red', marginRight: '2px' }}>*</span>占股比例：
 									</div>
										<div style={{ display: 'inline-block', width: '80%' }}>
											{getFieldDecorator('ratio', {
												initialValue: '',
												rules: [
													{ required: true, message: '请选择占股比例' }
												]
											})(<Select
												style={{ width: 200 }}
												placeholder="请选择占股比例">
												{ratio.map(item =>
													<Select.Option key={item.id} value={item.id}>
														{item.title}
													</Select.Option>
												)}
											</Select>)}
										</div>
									</div>
									<div style={rowStyle}>
										<div style={labelStyle}>
											<span style={{ color: 'red', marginRight: '2px' }}>*</span>退出方式：
 									</div>
										<div style={{ display: 'inline-block', width: '80%' }}>
											{getFieldDecorator('exit_mode', {
												initialValue: '',
												rules: [
													{ required: true, message: '请选择退出方式' }
												]
											})(<Checkbox.Group
												options={exit_mode.map(item => ({
													label: item.title,
													value: item.id
												}))} />)}
										</div>
									</div>
								</>
								: null}

							{IFModeEnum.CLAIM === category ?
								<>
									<div style={rowStyle}>
										<div style={labelStyle}>
											<span style={{ color: 'red', marginRight: '2px' }}>*</span>风控要求：
 								</div>
										<div style={{ display: 'inline-block', width: '80%' }}>
											{getFieldDecorator('risk', {
												initialValue: '',
												rules: [
													{ required: true, message: '请选择风控要求' }
												]
											})(<Select
												style={{ width: 200 }}
												placeholder="请选择风控要求">
												{risk.map(item =>
													<Select.Option key={item.id} value={item.id}>
														{item.title}
													</Select.Option>
												)}
											</Select>)}
										</div>
									</div>
									<div style={rowStyle}>
										<div style={labelStyle}>
											还款来源：
 								</div>
										<div style={{ display: 'inline-block', width: '80%' }}>
											{getFieldDecorator('payment')(
												<Input style={{ width: 200 }} placeholder="请填写还款来源" />
											)}
										</div>
									</div>
									<div style={rowStyle}>
										<div style={labelStyle}>
											<span style={{ color: 'red', marginRight: '2px' }}>*</span>承担利息：
 								</div>
										<div style={{ display: 'inline-block', width: '80%' }}>
											{getFieldDecorator('interest', {
												initialValue: '',
												rules: [
													{ required: true, message: '请选择承担利息' }
												]
											})(<Select
												style={{ width: 200 }}
												placeholder="请选择承担利息">
												{interest.map(item =>
													<Select.Option key={item.id} value={item.id}>
														{item.title}
													</Select.Option>
												)}
											</Select>)}
										</div>
									</div>
									<div style={rowStyle}>
										<div style={labelStyle}>
											<span style={{ color: 'red', marginRight: '2px' }}>*</span>资金占用时长：
 								</div>
										<div style={{ display: 'inline-block', width: '80%' }}>
											{getFieldDecorator('occupancy_time', {
												initialValue: '',
												rules: [
													{ required: true, message: '请选择资金占用时长' }
												]
											})(<Select
												style={{ width: 200 }}
												placeholder="请选择资金占用时长">
												{occupancy_time.map(item =>
													<Select.Option key={item.id} value={item.id}>
														{item.title}
													</Select.Option>
												)}
											</Select>)}
										</div>
									</div>
								</>
								: null}

							<div style={rowStyle}>
								<div style={labelStyle}>
									<span style={{ color: 'red', marginRight: '2px' }}>*</span>融资用途：
 								</div>
								<div style={{ display: 'inline-block', width: '80%' }}>
									{getFieldDecorator('purposes', {
										initialValue: '',
										rules: [
											{ required: true, message: '请填写融资用途' }
										]
									})(<TextArea rows={5} placeholder="请填写融资用途" />)}
								</div>
							</div>
							<div style={rowStyle}>
								<div style={labelStyle}>
									团队介绍：
 								</div>
								<div style={{ display: 'inline-block', width: '80%' }}>
									{getFieldDecorator('team_info', {
										initialValue: '',
									})(<TextArea rows={5} placeholder="请填写团队介绍" />)}
								</div>
							</div>
							<div style={rowStyle}>
								<div style={labelStyle}>
									项目优势：
 								</div>
								<div style={{ display: 'inline-block', width: '80%' }}>
									{getFieldDecorator('advantage', {
										initialValue: ''
									})(<TextArea rows={5} placeholder="请填写项目优势" />)}
								</div>
							</div>
							<div style={rowStyle}>
								<div style={labelStyle}>
									<span style={{ color: 'red', marginRight: '2px' }}>*</span>项目进展：
 								</div>
								<div style={{ display: 'inline-block', width: '80%' }}>
									{getFieldDecorator('progress', {
										initialValue: '',
										rules: [
											{ required: true, message: '标题' }
										]
									})(<TextArea rows={5} placeholder="请填写项目进展" />)}
								</div>
							</div>
							<div style={rowStyle}>
								<div style={labelStyle}>
									<span style={{ color: 'red', marginRight: '2px' }}>*</span>项目介绍：
 								</div>
								<div style={{ display: 'inline-block', width: '80%' }}>
									{getFieldDecorator('info', {
										initialValue: '',
										rules: [
											{ required: true, message: '请填写项目介绍' }
										]
									})(<TextArea rows={5} placeholder="请填写项目介绍" />)}
								</div>
							</div>
							<div style={rowStyle}>
								<div style={labelStyle}>
									<span style={{ color: 'red', marginRight: '2px' }}>*</span>可提供资料：
 								</div>
								<div style={{ display: 'inline-block', width: '80%' }}>
									{getFieldDecorator('data', {
										initialValue: '',
										rules: [
											{ required: true, message: '请选择可提供资料' }
										]
									})(<Checkbox.Group
										options={data.map(item => ({
											label: item.title,
											value: item.id
										}))} />)}
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
})));