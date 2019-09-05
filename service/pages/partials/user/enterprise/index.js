import { useApolloClient } from '@apollo/react-hooks';
import { Button, Cascader, Col, Form, Icon, Input, message, Row, Upload } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { M_LEVEL_UP } from '../../../gql';
import { UserStatusEnum, UserTypeEnum } from '../../../lib/enum';
import { uploadOne } from '../../../lib/fetch';
import { jump } from '../../../lib/global';
import './index.scss';

export default Form.create()(props => {

	const { area, areaList, enabled, user, identity, form } = props;
	const { getFieldDecorator } = form;

	const client = useApolloClient();

	const [businessLicense, setBusinessLicense] = useState(null);

	useEffect(() => {
		setBusinessLicense(user.business_license);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		form.validateFields((err, values) => {
			if (!!err) {
				return false;
			}

			if (!businessLicense) {
				message.error('请先上传营业执照');
				return false;
			}

			values.id = user.id;
			values.type = UserTypeEnum.ENTERPRISE;
			values.identity = identity;
			values.business_license = businessLicense;
			values.area = { id: values.area.pop() };

			client.mutate({
				mutation: M_LEVEL_UP,
				variables: {
					data: { user: values }
				},
				update: (_, { data }) => {
					if (data && data.levelUp) {
						message.success('申请已提交，请等待工作人员审核！');
						jump('/user');
					}
				}
			});
		});
	}

	const onUpload = async (file) => {
		const res = await uploadOne(file);

		if (!!res && res.relativePath) {
			setBusinessLicense(res.relativePath);
		}
	};

	return (
		<Row>
			<Col span={16}>
				<Form onSubmit={handleSubmit}>
					<Form.Item label={'企业全称：'}>
						{getFieldDecorator('company', {
							initialValue: user.company,
							rules: [{ required: true, message: '企业全称', whitespace: true }]
						})(<Input disabled={!enabled} />)}
					</Form.Item>
					<Form.Item label={'统一社会信用代码：'}>
						{getFieldDecorator('org_code', {
							initialValue: user.org_code,
							rules: [
								{ required: true, message: '统一社会信用代码', whitespace: true },
								{
									pattern: /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/g,
									message: '格式不正确'
								}
							]
						})(<Input disabled={!enabled} />)}
					</Form.Item>
					<Form.Item label={'联系人姓名：'}>
						{getFieldDecorator('realname', {
							initialValue: user.realname,
							rules: [{ required: true, message: '联系人姓名', whitespace: true }]
						})(<Input disabled={!enabled} />)}
					</Form.Item>
					<Form.Item label={'联系电话'}>
						{getFieldDecorator('phone', {
							initialValue: user.phone,
							rules: [
								{ required: true, message: '联系电话', whitespace: true },
								{
									pattern: /^1[34578]\d{9}$/,
									message: '格式不正确'
								}
							]
						})(<Input disabled={!enabled} />)}
					</Form.Item>
					<Form.Item label="所在地区：" hasFeedback>
						{getFieldDecorator('area', {
							initialValue: area,
							rules: [{ required: true, message: '请选择所在地区' }]
						})(
							<Cascader
								disabled={!enabled}
								placeholder="请选择所在地区"
								options={areaList} />
						)}
					</Form.Item>
					<Form.Item>
						{UserStatusEnum.NORMAL === user.status ? (
							<Button type="primary" htmlType="submit">
								保存资料
 											</Button>
						) : (
								null
							)}
						{UserStatusEnum.REJECTED === user.status ? (
							<Button type="primary" htmlType="submit">
								重新提交
 											</Button>
						) : (
								null
							)}
						{UserStatusEnum.PENDING === user.status ? (
							<Button disabled={true} type="primary" htmlType="submit">
								正在审核中
 							</Button>
						) : (
								null
							)}
						{UserStatusEnum.CHECKED === user.status ? (
							<Button disabled={true} type="primary" htmlType="submit">
								审核已通过
 							</Button>
						) : (
								null
							)}
					</Form.Item>
				</Form>
			</Col>
			<Col span={4}>
				<Upload
					disabled={!enabled}
					action={null}
					showUploadList={false}
					beforeUpload={(file) => {
						if (file.size > 2 * 1024 * 1024) {
							message.error('请上传小于2M的图片');
							return false;
						}
						onUpload(file);
						return false;
					}}
				>
					<div className="upload-org">
						{!!businessLicense ? (
							<Fragment>
								<img style={{ maxWidth: 300 }} src={businessLicense} />
								<Button disabled={!enabled} className="upload-btn">
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
		</Row >
	)
});