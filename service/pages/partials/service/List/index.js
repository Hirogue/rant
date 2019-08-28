import moment from 'moment';
import IconFont from '../../../components/IconFont';

import './service_list.scss';
import GlobalContext from '../../../components/context/GlobalContext';

export default (props) => {
	const data = props.data || {};

	return (
		<GlobalContext.Consumer>
			{(context) => {
				const serviceApplys = context.serviceApplys || [];

				return (
					<div className="service-item">
						<a className="logo-link" href={`/service/detail?id=${data.id}`} target="_blank">
							<img src={!!data.thumbnail ? data.thumbnail.url : ''} />
						</a>
						<div className="content">
							<a as={`/service/detail/${data.id}`} href={`/service/detail?id=${data.id}`} target="_blank">
								<h4 className="title">
									{data.name}
									<span>({data.title})</span>
								</h4>
							</a>
							<p className="text">
								{!!data.subtitle ? data.subtitle.length > 40 ? (
									data.subtitle.substr(0, 80) + '...'
								) : (
									data.subtitle
								) : (
									''
								)}
							</p>
						</div>
						<div className="right">
							{serviceApplys.find((apply) => apply.service_id === data.id) ? (
								<a className="btn" href="javascript:;" style={{ background: '#ccc' }}>
									已交换
								</a>
							) : (
								<a className="btn" onClick={() => context.applyService(data.id)}>
									<IconFont className="iconfont" type="icon-iLinkapp-" />交换名片
								</a>
							)}
							<ul className="icons">
								<li>
									<IconFont className="iconfont" type="icon-shijian1" />
									<span>{moment(data.created_when).format('YYYY-MM-DD')}</span>
								</li>
								<li>
									<IconFont className="iconfont" type="icon-dingweiweizhi" />
									<span>{data.area}</span>
								</li>
							</ul>
						</div>
					</div>
				);
			}}
		</GlobalContext.Consumer>
	);
};
