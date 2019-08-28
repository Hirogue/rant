import _ from 'lodash';
import './userfooter.scss';
import config from '../../config/config';
import LoginContext from '../context/LoginContext';

export default class UserFooter extends React.Component {
	render() {
		return (
			<LoginContext.Consumer>
				{(context) => {
					const siteInfo = context.siteInfo || {};
					return (
						<div className="user-footer" style={this.props.style}>
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
										''
									)}
								</ul>
							</div>
							<p className="copy">
								{siteInfo.copyright} |{' '}
								<a target="_blank" href={siteInfo.icpLink}>
									{siteInfo.icp}
								</a>{' '}
								|{' '}
								<img
									className="icon-img"
									src={config.staticImgUrl + 'WechatIMG110.png'}
									style={{ marginLeft: 4, marginRight: 4 }}
								/>
								<a target="_blank" href={siteInfo.picpLink}>
									{siteInfo.picp}
								</a>
							</p>
						</div>
					);
				}}
			</LoginContext.Consumer>
		);
	}
}
