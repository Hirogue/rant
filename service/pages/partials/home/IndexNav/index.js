import { Anchor } from 'antd';
import './index_nav.scss';

const { Link } = Anchor;

export default () => (
	<div className="index-nav">
		<Anchor offsetTop={156} className="index-nav-box">
			<Link href="#find-capital" title="金融资本" />
			<Link href="#success-case" title="成功案例" />
			<Link href="#server" title="江旅金融" />
			<Link href="#team" title="专家团队" />
			<Link href="#service" title="配套服务" />
			<Link href="#news" title="政策资讯" />
		</Anchor>
	</div>
);
