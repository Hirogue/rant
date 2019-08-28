import './user_header.scss';
import Router from 'next/router';
import config from '../../config/config';
import LoginContext from '../context/LoginContext';

export default () => {
	return (
		<LoginContext.Consumer>
			{(context) => {
				const user = context.user || {};
				return (
					<div className="user-header">
						<a className="logo" href="/">
							<img src={config.staticImgUrl + 'logo_foot.png'} alt="logo" />
						</a>

						<ul className="nav-ul">
							<li>
								<a href="/">首页</a>
							</li>
							<li>
								<a href="/project">项目招商</a>
							</li>
							<li>
								<a href="/finance">金融资本</a>
							</li>
							
							<li>
								<a href="/service">
									配套服务
								</a>
							</li>
							<li>
								<a href="/news">
									政策资讯
								</a>
							</li>
							<li>
								<a href="/product">江旅金融</a>
							</li>
							<li>
								<a href="/about">
									关于我们
								</a>
							</li>
							<li>
								<a href="http://2b.tolvyo.com/Login/Index" target="_blank">
									赣游通
								</a>
							</li>
						</ul>
						<div className="login-join">
							<a className="iphone">
								{user ? user.real_name ? user.real_name : user.credential : user.credential}
							</a>
							<span>您好!</span>
							<a
								href="javascript:;"
								onClick={() => {
									context.logout();
								}}
							>
								[ 退出 ]
							</a>
						</div>
					</div>
				);
			}}
		</LoginContext.Consumer>
	);
};
