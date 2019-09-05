import { useApolloClient } from '@apollo/react-hooks';
import { Alert, Radio, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import IconFont from '../../components/IconFont';
import UserLayout from '../../components/Layout/UserLayout';
import withContext, { GlobalContext } from '../../components/Layout/withContext';
import { IdentityEnum, UserStatusEnum, UserTypeEnum } from '../../lib/enum';
import { getAreaList, toFetchCurrentUser, toGetParentArrayByChildNode } from '../../lib/global';
import EnterpriseForm from '../../partials/user/enterprise';
import PersonalForm from '../../partials/user/personal';
import './user.scss';

const RadioGroup = Radio.Group;

export default withContext(props => {
	const client = useApolloClient();
	const ctx = useContext(GlobalContext);
	const [flag, setFlag] = useState(false);

	const [areaList, setAreaList] = useState([]);
	const [area, setArea] = useState(null);

	const [userType, setUserType] = useState(user ? user.type : UserTypeEnum.ENTERPRISE);
	const [userIdentity, setIdentity] = useState(user ? user.identity : IdentityEnum.FINANCER);

	useEffect(() => {
		(async () => {
			const currentUser = await toFetchCurrentUser();
			ctx.setCurrentUser(currentUser);

			const list = await getAreaList(client);
			setAreaList(list);

			const userArea = currentUser.area ? (
				toGetParentArrayByChildNode(list, { id: currentUser.area.id })
			) : null;

			setArea(userArea ? userArea.map(item => item.id) : null);
			setIdentity(currentUser.identity);
			setUserType(currentUser.type);

			setFlag(true);
		})();
	}, []);

	if (!flag) return <Spin style={{ position: 'fixed', top: '50%', left: '50%' }} tip="loading..." />;

	const user = ctx.user;

	const identityModified = UserStatusEnum.NORMAL === user.status;
	const enabled = UserStatusEnum.NORMAL === user.status || UserStatusEnum.REJECTED === user.status;

	return (
		<UserLayout>
			<div className="user-right-content">
				<div className="top-tips">
					<IconFont className="iconfont" type="icon-dengpao1" />
					<p>
						尊敬的V{user.vip}级用户，本日剩余可查看项目方或资金方信息数为 {user.applyCount < 0 ? 0 : user.applyCount} 条。
					</p>
				</div>
				<div className="top-tips">
					<IconFont className="iconfont" type="icon-dengpao1" />
					<p>
						完善资料并审核通过之后，系统将自动给您升级VIP等级并生成一张名片，名片可以和其他会员交换。完整的基本资料是会员联系到您的重要保证，更是让对方能够初步了解您的基础。
					</p>
				</div>
				{user.status === UserStatusEnum.REJECTED ? (
					<div className="top-tips">
						<IconFont className="iconfont" type="icon-dengpao1" />
						<div>
							<Alert
								message="入驻申请已被驳回"
								description={'驳回理由：' + user.reason}
								type="error"
								showIcon
							/>
						</div>
					</div>
				) : ''}
				<div className="radio-list">
					<p><span>*</span>会员身份：</p>

					<RadioGroup
						disabled={!identityModified}
						onChange={(e) => {
							if (IdentityEnum.PROVIDER === e.target.value) {
								setUserType(UserTypeEnum.ENTERPRISE);
							}
							setIdentity(e.target.value);
						}}
						value={userIdentity}
					>
						<Radio value={IdentityEnum.FINANCER}>项目方</Radio>
						<Radio value={IdentityEnum.INVESTOR}>资金方</Radio>
						<Radio value={IdentityEnum.PROVIDER}>服务商</Radio>
					</RadioGroup>

					<p>( <span>*</span> 提交后不可更改 )</p>
				</div>

				<div className="fund-form">
					<div className="tab-title">
						<p>我的名片</p>
					</div>
					<div className="form-main">
						<div className="id-tab">
							<p><span>*</span>会员身份：</p>

							<RadioGroup
								disabled={!enabled}
								onChange={(e) => setUserType(e.target.value)}
								value={userType}
							>
								<Radio value={UserTypeEnum.ENTERPRISE}>企业</Radio>
								{
									IdentityEnum.PROVIDER !== userIdentity ?
										<Radio value={UserTypeEnum.PERSONAL}>个人</Radio> : null
								}
							</RadioGroup>
						</div>

						{UserTypeEnum.ENTERPRISE === userType ?
							<EnterpriseForm
								enabled={enabled}
								user={user}
								areaList={areaList}
								area={area}
								identity={userIdentity}
							/>
							:
							<PersonalForm
								enabled={enabled}
								user={user}
								areaList={areaList}
								area={area}
								identity={userIdentity}
							/>
						}
					</div>
				</div>
			</div>
		</UserLayout >
	)
});
