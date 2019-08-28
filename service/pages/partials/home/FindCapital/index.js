import config from '../../../config/config';
import IconFont from '../../../components/IconFont';
import GlobalContext from '../../../components/context/GlobalContext';

import './find_capital.scss';

export default class extends React.Component {
	render() {
		return (
			<GlobalContext.Consumer>
				{(context) => {
					return (
						<div id="find-capital" className="find-capital-containar">
							<div className="find-capital">
								<div className="find-capital-top">
									<h4>金融资本</h4>
									<a onClick={() => context.publishFunding()}>
										<p>发布需求</p>
									</a>
								</div>
								<div className="find-capital-list">
									<div className="left">
										<a href="/finance?category=股权投资">
											<div className="find-capital-item">
												<img src={config.staticImgUrl + 'guquan-img-on.png'} alt="股权投资" />
												<h4>股权投资</h4>
												<p>引入实力投资，助推企业发展</p>
											</div>
										</a>
										<a href="/finance?category=债权投资">
											<div className="find-capital-item">
												<img src={config.staticImgUrl + 'zq-img-on.png'} alt="债权投资" />
												<h4>债权投资</h4>
												<p>借款方式多样，融资就这么简单</p>
											</div>
										</a>
									</div>
									<div className="right">
										<a href="/finance?industry=酒店与民宿">
											<div className="item">
												<IconFont className="iconfont" type="icon-jiudian" />
												<p>酒店与民宿</p>
											</div>
										</a>
										<a href="/finance?industry=旅游餐饮">
											<div className="item">
												<IconFont className="iconfont" type="icon-canyin" />
												<p>旅游餐饮</p>
											</div>
										</a>
										<a href="/finance?industry=旅行社">
											<div className="item">
												<IconFont className="iconfont" type="icon-lvhangshe_icon" />
												<p>旅行社</p>
											</div>
										</a>
										<a href="/finance?industry=旅游快消品">
											<div className="item">
												<IconFont className="iconfont" type="icon-xiaofei" />
												<p>旅游快消品</p>
											</div>
										</a>
										<a href="/finance?industry=景区">
											<div className="item">
												<IconFont className="iconfont" type="icon-tongzhi" />
												<p>景区</p>
											</div>
										</a>
										<a href="/finance?industry=旅游康养">
											<div className="item">
												<IconFont className="iconfont" type="icon-jingqu" />
												<p>旅游康养</p>
											</div>
										</a>
										<a href="/finance?industry=旅游大交通">
											<div className="item">
												<IconFont className="iconfont" type="icon-traffic" />
												<p>旅游大交通</p>
											</div>
										</a>
										<a href="/finance?industry=智慧旅游">
											<div className="item">
												<IconFont className="iconfont" type="icon-lvyou" />
												<p>智慧旅游</p>
											</div>
										</a>
										<a href="/finance?industry=其他">
											<div className="item">
												<IconFont className="iconfont" type="icon-qita" />
												<p>其他</p>
											</div>
										</a>
									</div>
								</div>
							</div>
						</div>
					);
				}}
			</GlobalContext.Consumer>
		);
	}
}
