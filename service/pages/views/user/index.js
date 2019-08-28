import React from 'react';
import { Radio, Alert } from 'antd';
import IconFont from '../../components/IconFont';
import UserLayout from '../../components/Layout/UserLayout';
import './user.scss';

import LoginContext from '../../components/context/LoginContext';
import EnterpriseForm from '../../partials/user/enterprise';
import PersonalForm from '../../partials/user/personal';

const RadioGroup = Radio.Group;

class UserPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			idType: '企业'
		};
	}

	onChange = (e) => {
		if (e.target.value === '服务商') {
			this.setState({
				idType: '企业'
			});
		}

		this.setState({
			value: e.target.value
		});
	};

	onChangeType = (e) => {
		this.setState({
			idType: e.target.value
		});
	};

	render() {
		return (
			<UserLayout>
				<LoginContext.Consumer>
					{(context) => {
						const user = context.user;
						const mainData = context.mainData;
						const applyCount = context.applyCount || 0;

						if (!user) return '';
						if (!mainData) return '';

						const id_name = user.id_name;
						const thisIdType = user.id_type || this.state.idType;

						return (
							<div className="user-right-content">
								<div className="top-tips">
									<IconFont className="iconfont" type="icon-dengpao1" />
									<p>
										尊敬的V{user.vip}级用户，本日剩余可查看项目方或资金方信息数为 {applyCount < 0 ? 0 : applyCount} 条。
									</p>
								</div>
								<div className="top-tips">
									<IconFont className="iconfont" type="icon-dengpao1" />
									<p>
										完善资料并审核通过之后，系统将自动给您升级VIP等级并生成一张名片，名片可以和其他会员交换。完整的基本资料是会员联系到您的重要保证，更是让对方能够初步了解您的基础。
									</p>
								</div>
								{user.status === 'REJECT' ? (
									<div className="top-tips">
										<IconFont className="iconfont" type="icon-dengpao1" />
										<p>
											<Alert
												message="入驻申请已被驳回"
												description={'驳回理由：' + user.reject_msg}
												type="error"
												showIcon
											/>
										</p>
									</div>
								) : (
										''
									)}

								<div className="radio-list">
									<p>
										<span>*</span>会员身份：
									</p>
									{id_name === '游客' ? (
										<RadioGroup onChange={this.onChange} value={this.state.value}>
											<Radio value="资金方">资金方</Radio>
											<Radio value="项目方">项目方</Radio>
											<Radio value="服务商">服务商</Radio>
										</RadioGroup>
									) : (
											<RadioGroup onChange={this.onChange} value={id_name}>
												<Radio value={id_name}>{id_name}</Radio>
											</RadioGroup>
										)}
									<p>
										{' '}
										( <span>*</span> 提交后不可更改 )
									</p>
								</div>

								<div className="fund-form">
									<div className="tab-title">
										<p>我的名片({id_name !== '游客' ? id_name : this.state.value})</p>
									</div>
									<div className="form-main">
										<div className="id-tab">
											<p>
												<span>*</span>会员身份：
											</p>
											{this.state.value !== '服务商' ? !!user.id_type ? (
												<RadioGroup
													onChange={this.onChangeType}
													defaultValue={user.id_type}
													value={thisIdType}
												>
													<Radio value={user.id_type}>{user.id_type}</Radio>
												</RadioGroup>
											) : (
													<RadioGroup
														onChange={this.onChangeType}
														defaultValue="企业"
														value={thisIdType}
													>
														<Radio value="企业">企业</Radio>
														<Radio value="个人">个人</Radio>
													</RadioGroup>
												) : (
													<RadioGroup onChange={this.onChangeType} value="企业">
														<Radio value="企业">企业</Radio>
													</RadioGroup>
												)}
										</div>
										{thisIdType === '企业' ? (
											<EnterpriseForm
												user={user}
												area={mainData.area.ex_info.tags || []}
												idName={this.state.value}
											/>
										) : (
												<PersonalForm
													area={mainData.area.ex_info.tags || []}
													idName={this.state.value}
												/>
											)}
									</div>
								</div>
							</div>
						);
					}}
				</LoginContext.Consumer>
			</UserLayout>
		);
	}
}

export default UserPage;
