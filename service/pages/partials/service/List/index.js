import moment from 'moment';
import IconFont from '../../../components/IconFont';

import { toApplayCommonHandler } from '../../../lib/global';
import { M_APPLY_PROVIDERS } from '../../../gql';
import './service_list.scss';

export default ({ data, router }) => {
	
	const toSetVal = (val) => (key) => (def) => val ? val[key] : def;

	const toShowApplyButton = (data) => (applyArray) => {
		if (applyArray && applyArray.find(apply => apply.id === data.id)) {
			return (
				<a className="btn" href="javascript:;" style={{ background: '#ccc' }}>
					已交换
				</a>
			)
		}
		return (
			<a className="btn" onClick={() => toApplayCommonHandler(router, { provider: { ...data, title: data.name } }, M_APPLY_PROVIDERS)}>
				<IconFont className="iconfont" type="icon-iLinkapp-" />交换名片
			</a>
		)
	}

	let user = {};

	try {
		user = JSON.parse(localStorage.getItem('u_user')) || {};
	} catch (error) {
		console.info('您还未登录！');
	}

	return (
		<div className="service-item">
			<a className="logo-link" href={`/service/detail?id=${data.id}`} target="_blank">
				<img src={data.logo} />
			</a>
			<div className="content">
				<a as={`/service/detail/${data.id}`} href={`/service/detail?id=${data.id}`} target="_blank">
					<h4 className="title">{data.name}</h4>
				</a>
				<p className="text">{data.summary}</p>
			</div>
			<div className="right">
				{toShowApplyButton(data)(user.apply_providers)}
				<ul className="icons">
					<li>
						<IconFont className="iconfont" type="icon-shijian1" />
						<span>{moment(data.created_at).format('YYYY-MM-DD')}</span>
					</li>
					<li>
						<IconFont className="iconfont" type="icon-dingweiweizhi" />
						<span>{data.area_path}</span>
					</li>
				</ul>
			</div>
		</div>
	);
};
