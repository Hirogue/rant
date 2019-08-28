import React from 'react';
import moment from 'moment';
import { withRouter } from 'next/router';
import BaseLayout from '../../../components/Layout/BaseLayout';
import BreadCrumb from '../../../components/BreadCrumb';

import IconFont from '../../../components/IconFont';
import './help_detail.scss';
import GlobalContext from '../../../components/context/GlobalContext';

@withRouter
export default class extends React.Component {
	render() {
		const detail = this.props.router.query.detail || {};

		return (
			<BaseLayout>
				<GlobalContext.Consumer>
					{(context) => {
						const siteInfo = context.siteInfo || {};

						return (
							<div className="help-detail-main">
								<BreadCrumb adrname_two={'帮助中心'} />
								<div className="help-content">
									<div className="left">
										<h4 className="left-title">{'帮助中心'}</h4>
										{/* <a className="nav-item active">新手指引</a>
                    <a className="nav-item">法律法规</a>
                    <a className="nav-item">合作机构</a>
                    <a className="nav-item">保障体系</a>
                    <a className="nav-item">网站公告</a> */}
										<div className="hotline">
											<div className="icon-name">
												<IconFont className="iconfont" type="icon-icon-test" />
												<span>服务热线</span>
											</div>
											<h4 className="iphone">{siteInfo.hotline}</h4>
										</div>
									</div>
									<div className="right">
										<p className="list-title">{detail.title}</p>
										<div className="content-main">
											<div className="content-title">
												<h4>{detail.title}</h4>
												<p>{moment(detail.release_datetime).format('YYYY-MM-DD HH:mm:ss')}</p>
											</div>

											<div
												className="content-text"
												dangerouslySetInnerHTML={{
													__html: !!detail.ex_info ? detail.ex_info.richtext.html : ''
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						);
					}}
				</GlobalContext.Consumer>
			</BaseLayout>
		);
	}
}
