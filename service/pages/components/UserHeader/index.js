import { useContext } from 'react';
import { GlobalContext } from '../Layout/withContext';
import './user_header.scss';

export default () => {

	const { user = {}, logout, navMenus, staticImgUrl } = useContext(GlobalContext);

	return (
		<div className="user-header">
			<a className="logo" href="/">
				<img src={staticImgUrl + 'logo_foot.png'} alt="logo" />
			</a>

			<ul className="nav-ul">
				{navMenus.map((item, index) => (
					<li key={index}>
						<a href={item.url}>{item.name}</a>
					</li>
				))}
			</ul>

			<div className="login-join">
				<a className="iphone">
					{user ? (user.realname ? user.realname : user.account) : ''}
				</a>
				<span>您好!</span>
				<a
					href="javascript:;"
					onClick={() => {
						logout();
					}}
				>
					[ 退出 ]
				</a>
			</div>
		</div>
	);
};
