import React, { useEffect } from 'react';
import { withRouter } from 'next/router';
import { Spin } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import QRCode from 'qrcode';
import IconFont from '../../../components/IconFont';
import BaseLayout from '../../../components/Layout/BaseLayout';
import BreadCrumb from '../../../components/BreadCrumb';

import './service_detail.scss';
import config from '../../../config/config';
import { PC_2_MOBILE_MAP } from '../../../lib/enum';
import { createApolloClient } from "../../../lib/apollo";
import { buildingQuery, getUrlParam, toApplayCommonHandler, asyncEffectHandler } from "../../../lib/global";
import { Q_GET_PROVIDER_DETAIL, M_APPLY_PROVIDERS } from '../../../gql'

const client = createApolloClient();
const defaultVariables = {
	join: [
		{ field: 'category' },
		{ field: 'area' },
		{ field: 'applicants' }
	]
};

export default withRouter((props) => {

	let { router } = props;
	let id = getUrlParam(router, 'id');
	let user = {};

	try {
		user = JSON.parse(localStorage.getItem('u_user')) || null;
	} catch (error) {
		console.info('您还未登录！');
	}

	const { loading, data: { provider } } = useQuery(Q_GET_PROVIDER_DETAIL, {
		fetchPolicy: "no-cache",
		client: client,
		variables: {
			id,
			queryString: buildingQuery(defaultVariables)
		}
	});	

	useEffect(() => {
		asyncEffectHandler(async () => {
			try {
				document.querySelector('#qrcode').src = await QRCode.toDataURL(`${PC_2_MOBILE_MAP['service']}/${id}`);
			} catch (error) {
				console.error(error.message);
			}
		})
	}, [provider])

	const toShowApplyButton = (data) => (applyArray) => {
		if (applyArray && applyArray.find(apply => apply.id === data.id)) {
			return <a style={{ background: '#ccc' }}>已交换</a>
		}
		return <a onClick={() => toApplayCommonHandler(router, { provider: data }, M_APPLY_PROVIDERS)}>交换名片</a>
	}

	const toSetVal = (val) => (key) => (def) => val && val[key] ? val[key] : def;

	if (loading) return <Spin style={{ position: "fixed", top: "50%", left: "50%" }} tip="正在加载中" />;

	return (
		<BaseLayout>
			<div className="service-detail-page">
				<div className="service-top">
					<img className="service-bg-img" src={'/static/img/service-bg.png'} />
					<div className="service-top-content">
						<div className="left">
							<img
								style={{ width: 190, height: 80 }}
								className="service-logo-img"
								src={provider.logo}
							/>
							<div className="name-btn">
								<p>{provider.name}</p>
								{toShowApplyButton(provider)(user ? user.apply_providers : null)}
							</div>
						</div>
						<ul className="right">
							<li>
								<span>机构类别</span>
								<span>{provider.category ? provider.category.title : '暂无'}</span>
							</li>
							<li>
								<span>所在地区</span>
								<span>{provider.area_path}</span>
							</li>
						</ul>
					</div>
				</div>
				<BreadCrumb />
				<div className="item-main">
					<div className="item-top">
						<div className="icon">
							<IconFont className="iconfont" type="icon-jiantou" />
							<span>机构简介</span>
						</div>
					</div>
					<div className="item-content" dangerouslySetInnerHTML={{ __html: provider.introduction || '暂无' }} />
					<div style={{ width: "150px", margin: "4vw auto 0", display: "block" }}>
						<img id="qrcode" style={{ width: "150px", height: "150px", borderRadius: '6px', display: "block" }} src={config.staticImgUrl + '移动端二维码.png'} alt='placeholder+image' />
						<p style={{ fontSize: "14px", color: "#999", textAlign: "center" }}>在移动端查看此页面</p>
					</div>
				</div>
			</div>
		</BaseLayout>
	)
})
