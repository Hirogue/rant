import Head from 'next/head';

export default (props) => {
	const seo = props.seo || {};

	return (
		<div>
			<Head>
				<title key="title">旅游项目通</title>
				<meta key="keywords" name="Keywords" content="旅游项目通，投融资平台，投融资网，旅游产业，旅游投资，旅游融资平台" />
				<meta name="description" content="旅游项目通网是专业的投融资平台投融资网站，服务旅游产业投资客与融资客。为旅游投资客提供旅游项目融资信息，为旅游项目融资客搭建项目投融资平台。是江西省旅游集团牵头打造的一个集旅游项目资源、旅游投资企业、金融机构、旅游中介服务机构和旅游资产运营管理机构五位一体的线上金融服务平台。" />
			</Head>
		</div>
	);
};
