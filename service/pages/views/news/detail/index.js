import React from 'react';
import moment from 'moment';
import { withRouter } from 'next/router';

import BaseLayout from '../../../components/Layout/BaseLayout';
import BreadCrumb from '../../../components/BreadCrumb';

import './new_detail.scss';

import GlobalContext from '../../../components/context/GlobalContext';

@withRouter
export default class NewsDetail extends React.Component {
	async componentDidMount() {
		const script = document.createElement('script');
		script.src =
			"http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];";
		script.type = 'text/javascript';
		document.body.appendChild(script);
	}

	render() {
		const data = this.props.router.query.detail;

		const detail = data.detail;
		const prev = !data.prev ? null : data.prev.length > 0 ? data.prev[0] : null;
		const next = !data.next ? null : data.next.length > 0 ? data.next[0] : null;

		return (
			<BaseLayout>
				<GlobalContext.Consumer>
					{(context) => {
						return (
							<div className="news-detail-page">
								<BreadCrumb adrname_two={'政策资讯'} adrname_thr={'所有资讯'} />
								<div className="news-detail-main">
									{!!detail ? (
										<div className="news-detail-box">
											<div className="img-box">
												{/* <img src={config.staticImgUrl + 'new-img.png'} /> */}
											</div>
											<div className="content-box clearfix" style={{ paddingTop: 20 }}>
												<div className="time-left">
													<p className="tile-p">
														<span>{moment(detail.release_datetime).format('YY')}</span>
														{moment(detail.release_datetime).format('M月')}
													</p>
													<p className="come-p icon-fangwen">
														{/* <IconFont className="iconfont" type="icon-denglu" /> by{' '} */}
														作者：{detail.author}
													</p>
													<p className="come-p icon-fangwen">来源：{detail.subtitle || '本站'}</p>
												</div>
												<div className="content-text">
													<h4 className="news-title" style={{ textAlign: 'center' }}>
														{detail.title}
													</h4>
													<div
														dangerouslySetInnerHTML={{
															__html: !!detail.ex_info ? detail.ex_info.richtext.html : ''
														}}
													/>
												</div>
											</div>

											<div className="share">
												<div className="bdsharebuttonbox">
													<a
														href="#"
														className="bds_tsina"
														data-cmd="tsina"
														title="分享到新浪微博"
													/>

													<a
														href="#"
														className="bds_weixin"
														data-cmd="weixin"
														title="分享到微信"
													/>
												</div>
											</div>
										</div>
									) : (
										''
									)}
									<div className="flip-box clearfix">
										{!!prev ? (
											<a className="a-pre" href={`/news/detail?id=${prev.id}`}>
												上一篇：{prev.title}
											</a>
										) : (
											''
										)}
										{!!next ? (
											<a className="a-next" href={`/news/detail?id=${next.id}`}>
												下一篇：{next.title}
											</a>
										) : (
											''
										)}
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
