import _ from 'lodash';
import config from '../../config/config';
import IconFont from '../IconFont';

import './footer.scss';
import GlobalContext from '../context/GlobalContext';
import { Fragment } from 'react';

export default (props) => {
	return (
		<GlobalContext.Consumer>
			{(context) => {
				const siteInfo = context.siteInfo || {};
				return (
					<div className="footer">
						<div className="footer-box">
							<div className="footer-left">
								{/* <img src={config.staticImgUrl + 'logo_foot.png'} alt="logo" /> */}
								<div className="contact">
									<IconFont className="iconfont" type="icon-24xiaoshidianhua" />
									<div className="contact-text">
										<h4>
											客服热线：<span>{siteInfo.hotline || "0791-87705085"}</span>
										</h4>
										<p>[公司地址] {siteInfo.address || "江西省南昌市红谷滩学府大道1号34栋6楼"}</p>
										<p>[邮政编码] {siteInfo.postCode || "330038"}</p>
										<p>[传真号码] {siteInfo.fax || "0791-87705030"}</p>
									</div>
								</div>
							</div>
							<div className="footer-middle">
								<div className="item">
									<img src={siteInfo.wechatQRCode || "/static/img/saoma.jpeg"} alt="saoma" />
									<p>扫码关注</p>
									<p>官方微信公众号</p>
								</div>
							</div>
							{/* <div className="footer-right">
								{siteInfo.mapLinks ? (
									_.sortBy(_.filter(siteInfo.mapLinks, (item) => item.tree_level === 3), [
										'sort'
									]).map((item, index) => (
										<ul className="nav-list" key={index}>
											<li className="nav-li">{item.name}</li>
											{_.sortBy(
												_.filter(siteInfo.mapLinks, (val) =>
													val.tree_path.startsWith(item.tree_path + '.')
												),
												[ 'sort' ]
											).map((sub, subIndex) => (
												<li className="nav-sub-li" key={subIndex}>
													<a href={sub.link} target="_blank">
														{sub.name}
													</a>
												</li>
											))}
										</ul>
									))
								) : (
									''
								)}
							</div> */}
							<div className="footer-right">
								<ul className="nav-list">
									<li className="nav-li">新手帮助</li>
									<li className="nav-sub-li"><a href="/help/detail?id=9bee2f4c-a690-4da3-85b5-b25a139c37c3" target="_blank">新手指引</a></li>
									<li className="nav-sub-li"><a href="/help/detail?id=a4ff99c4-5b7d-4cc4-9b11-c9749cb4b922" target="_blank">帮助中心</a></li>
									<li className="nav-sub-li"><a href="/help/detail?id=a653bed2-a1ca-4862-8364-1942d88bf83e" target="_blank">会员等级</a></li>
								</ul>
								<ul className="nav-list">
									<li className="nav-li">保障体系</li>
									<li className="nav-sub-li"><a href="/help/detail?id=cdc95df0-44ee-4399-b4db-248bf48a51c8" target="_blank">法律声明</a></li>
									<li className="nav-sub-li"><a href="/help/detail?id=e3149a68-a83c-43bf-8843-515a87dab94b" target="_blank">隐私服务</a></li>
									<li className="nav-sub-li"><a href="/help/detail?id=812422ec-6c53-4ee1-b54c-4473250ee66a" target="_blank">服务协议</a></li>
								</ul>
								<ul className="nav-list">
									<li className="nav-li">关于我们</li>
									<li className="nav-sub-li"><a href="/help/detail?id=2c495098-a6a3-4b9c-9b16-585084193751" target="_blank">公司简介</a></li>
									<li className="nav-sub-li"><a href="/help/detail?id=9d97befd-9ed2-4fd7-9c46-562d6c7447ea" target="_blank">联系我们</a></li>
									<li className="nav-sub-li"><a href="/help/detail?id=9b8e0146-1fec-41fc-a6b6-3b307536a43d" target="_blank">网站公告</a></li>
								</ul>
							</div>
						</div>
						<div className="links-box">
							<ul className="links">
								<li>友情链接：</li>
								{siteInfo.links ? (
									_.sortBy(siteInfo.links, [ 'sort' ]).map((item, index) => (
										<li key={index}>
											<a href={item.link} target="_blank">
												{item.value}
											</a>
										</li>
									))
								) : (
									<Fragment>
										<li>
											<a href="http://dct.jiangxi.gov.cn/" target="_blank">江西省文旅厅</a>
										</li>
										<li>
											<a href="http://www.jxto.com.cn/" target="_blank">江西省旅游集团</a>
										</li>
										<li>
											<a href="http://www.goyoto.com.cn/" target="_blank">江旅科技</a>
										</li>
										<li>
											<a href="/finance?category=%E8%82%A1%E6%9D%83%E6%8A%95%E8%B5%84" target="_blank">股权融资</a>
										</li>
										<li>
											<a href="/finance?category=%E5%80%BA%E6%9D%83%E6%8A%95%E8%B5%84" target="_blank">债权融资</a>
										</li>
										<li>
											<a href="/product?category=%E4%BE%9B%E5%BA%94%E9%93%BE%E9%87%91%E8%9E%8D%E4%BA%A7%E5%93%81" target="_blank">供应链金融</a>
										</li>
										<li>
											<a href="/" target="_blank">投融资平台</a>
										</li>
										<li>
											<a href="/" target="_blank">投融资网</a>
										</li>
										<li>
											<a href="/" target="_blank">旅游产业</a>
										</li>
										<li>
											<a href="/project" target="_blank">投融资项目平台</a>
										</li>
										<li>
											<a href="/project" target="_blank">项目投融资</a>
										</li>
										<li>
											<a href="/" target="_blank">旅游投资</a>
										</li>
									</Fragment>
								)}
							</ul>
						</div>
						<p className="copy">
							{siteInfo.copyright || "指导单位：江西省文化和旅游厅 | Copyright © 2019 江西省旅游集团股份有限公司"} |{' '}
							<a target="_blank" href={siteInfo.icpLink || "http://beian.miit.gov.cn/publish/query/indexFirst.action"}>
								{siteInfo.icp || "赣ICP备19002972号"}
							</a>{' '}
							|{' '}
							<img
								className="icon-img"
								src={"/static/img/WechatIMG110.png"}
								style={{ marginLeft: 4, marginRight: 4 }}
							/>
							<a target="_blank" href={siteInfo.picpLink || "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36010802000252"}>
								{siteInfo.picp || "赣公网安备:36010802000252号"}
							</a>
						</p>
					</div>
				);
			}}
		</GlobalContext.Consumer>
	);
};
