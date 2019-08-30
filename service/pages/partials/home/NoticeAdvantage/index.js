import Link from 'next/link';
import moment from 'moment';
import IconFont from '../../../components/IconFont';

import './notice_advantage.scss';

export default (props) => {
	const { data, siteInfo } = props;

	const noticeTop1 = data.length > 0 ? data[0] : {};

	// if (!siteInfo.entryCount) return '';

	// const entryCountArr = [];
	// const projectCountArr = [];
	// const amountArr = [];
	// for (let i = 0; i < siteInfo.entryCount.length; i++) {
	// 	entryCountArr.push(siteInfo.entryCount[i]);
	// }
	// for (let i = 0; i < siteInfo.projectCount.length; i++) {
	// 	projectCountArr.push(siteInfo.projectCount[i]);
	// }
	// for (let i = 0; i < siteInfo.amount.length; i++) {
	// 	amountArr.push(siteInfo.amount[i]);
	// }

	return (
		<div className="notice-advantage">
			<div className="notice-container">
				<div className="notice-box">
					<IconFont className="iconfont" type="icon-tongzhi" />

					<h4>
						<a href={`/news/detail?id=${noticeTop1.id}`}>
							<span>{moment(noticeTop1.create_at).format('YYYY-MM-DD')}</span>
							<span style={{ marginLeft: 10 }}>{noticeTop1.title}</span>
						</a>
					</h4>

					<a href="/news">查看更多</a>
				</div>
			</div>
			{/* <div className="advantage-container">
				<div className="advantage-box">
					<div className="advantage-item">
						<IconFont className="iconfont" type="icon-jinrong2" />
						<p>已入驻金融机构</p>
						<h4>
							{entryCountArr.map((item, index) => <span key={'A' + index}>{item}</span>)}
							<i>家+</i>
						</h4>
					</div>
					<div className="advantage-item">
						<IconFont className="iconfont" type="icon-tuandui" />
						<p>已对接项目方</p>
						<h4>
							{projectCountArr.map((item, index) => <span key={'B' + index}>{item}</span>)}
							<i>个+</i>
						</h4>
					</div>
					<div className="advantage-item">
						<IconFont className="iconfont" type="icon-jinrong1" />
						<p>成功对接金额</p>
						<h4>
							{amountArr.map((item, index) => <span key={'C' + index}>{item}</span>)}
							<i>亿+</i>
						</h4>
					</div>
				</div>
			</div> */}
		</div>
	);
};
