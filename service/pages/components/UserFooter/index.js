import { useContext } from 'react';
import { GlobalContext } from '../Layout/withContext';
import './userfooter.scss';
export default props => {

	const { copyright, icp, icpLink, picp, picpLink, links, staticImgUrl } = useContext(GlobalContext);

	return (
		<div className="user-footer" style={props.style}>
			<div className="links-box">
				<ul className="links">
					<li>友情链接：</li>
					{
						links.map((item, index) => (
							<li key={index}>
								<a href={item.url} target="_blank">
									{item.name}
								</a>
							</li>
						))
					}
				</ul>
			</div>
			<p className="copy">
				{copyright}
				{' '}
				<a target="_blank" href={icpLink}>
					{icp}
				</a>
				{' '}
				|
				{' '}
				<img
					className="icon-img"
					src={staticImgUrl + 'WechatIMG110.png'}
					style={{ marginLeft: 4, marginRight: 4 }}
				/>
				<a target="_blank" href={picpLink}>
					{picp}
				</a>
			</p>
		</div>
	);
}
