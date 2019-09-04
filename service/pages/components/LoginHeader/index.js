import { useContext } from 'react';
import { GlobalContext } from '../Layout/withContext';
import './login_header.scss';

export default props => {
	const { navMenus, hotLine, staticImgUrl } = useContext(GlobalContext);

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
			<div className="hotline">
				<span>客服热线：</span>
				<span>{hotLine}</span>
			</div>
		</div>
	);
};
