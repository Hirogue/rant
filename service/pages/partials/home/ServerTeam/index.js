import React from 'react';
import _ from 'lodash';
import IconFont from '../../../components/IconFont';
import GlobalContext from '../../../components/context/GlobalContext';

import './server.scss';

export default class extends React.Component {
	state = {
		current: '知名投资人'
	};

	changeTeamCategory = (current) => {
		this.setState((state) => ({
			...state,
			current
		}));
	};

	render() {
		const { data } = this.props;

		if (!data.length) return '';

		const teams = _.take(_.filter(data, (item) => item.category === this.state.current), 3);

		return (
			<GlobalContext.Consumer>
				{(context) => {
					const contentApplys = context.contentApplys || [];

					return (
						<div className="server-team-containar">
							<div id="server" className="server-box">
								<div className="server-top">
									<h4>江旅金融服务</h4>
									<ul className="link-list">
										<li>
											<a href="/product?category=供应链金融产品">供应链金融产品</a>
										</li>

										<li>
											<a href="/news/detail?id=dfba0ee3-fea2-4af1-8cde-de74f8b5f61a">旅游产业投资基金 </a>
										</li>

										<li>
											<a href="/news/detail?id=32ea9776-250e-420d-9fbd-6bdff649e1dd">策略投资 </a>
										</li>
									</ul>
									<a href="/product">
										<p>立即申请</p>
									</a>
								</div>
								<div className="server-list">
									<a className="server-item" href='http://www.lvyoto.com/product/detail?id=92fdbc63-b9bd-40d6-8f81-39870878fc36' target="_blank">
										<div className="icon">
											<IconFont className="iconfont" type="icon-jinrongkehu" />
										</div>
										<p>江旅成员通</p>
									</a>

									<a className="server-item" href='http://www.lvyoto.com/product/detail?id=81d5762a-7cd8-4e40-b764-1dbfbeb4853d' target="_blank">
										<div className="icon">
											<IconFont className="iconfont" type="icon-gongyinglianjinrongfuwu" />
										</div>
										<p>江旅集采通</p>
									</a>

									<a className="server-item" href='http://www.lvyoto.com/product/detail?id=0b1b7055-ff13-4df1-a1be-5903d383b6d9' target="_blank">
										<div className="icon">
											<IconFont className="iconfont" type="icon-raxiconjinrong" />
										</div>
										<p>江旅余值通</p>
									</a>

									<a className="server-item" href='http://www.lvyoto.com/product/detail?id=c291c080-1339-4f73-9b5c-c9e49a5bb3dc' target="_blank">
										<div className="icon">
											<IconFont className="iconfont" type="icon-jinrongzhuli" />
										</div>
										<p>江旅定采通</p>
									</a>
								</div>
							</div>
							<div id="team" className="team-box">
								<h4 className="team-box-title">专家团队</h4>
								<p className="line" />
								<ul className="link-list">
									<li onClick={() => this.changeTeamCategory('知名投资人')}>知名投资人</li>
									<li onClick={() => this.changeTeamCategory('目的地运营专家')}>目的地运营专家</li>
									<li onClick={() => this.changeTeamCategory('行业研究专家')}>行业研究专家</li>
								</ul>
								<div className="team-list">
									{teams.map((item) => (
										<div className="team-item" key={item.id}>
											<img className="avatar" src={item.avatar} />

											<h4 className="name">{item.name}</h4>
											<p className="post">{item.company}&nbsp;{item.position}</p>
											<p className="introduce">{item.info}</p>

											{contentApplys.find((apply) => apply.content_id === item.id) ? (
												<a href="javascript:;" style={{ background: '#ccc' }}>
													已约见
												</a>
											) : (
													<a href="javascript:;" onClick={() => context.applyContent(item.id)}>
														立即约见
												</a>
												)}
										</div>
									))}
								</div>
							</div>
						</div>
					);
				}}
			</GlobalContext.Consumer>
		);
	}
}
