import Document, { Head, Main, NextScript } from 'next/document';

export default class extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);

		return { ...initialProps, ...ctx.query };
	}

	render() {
		const { seo = {} } = this.props;

		return (
			<html>
				<Head>
					<title key="title">{seo.title || '旅游项目通'}</title>
					<meta
						key="keywords"
						name="keywords"
						content={
							seo.keywords
							||
							'旅游项目通，投融资平台，投融资网，旅游产业，旅游投资，旅游融资平台'
						}
					/>
					<meta
						key="description"
						name="description"
						content={
							seo.description
							||
							'旅游项目通网是专业的投融资平台投融资网站，服务旅游产业投资客与融资客。为旅游投资客提供旅游项目融资信息，为旅游项目融资客搭建项目投融资平台。是江西省旅游集团牵头打造的一个集旅游项目资源、旅游投资企业、金融机构、旅游中介服务机构和旅游资产运营管理机构五位一体的线上金融服务平台。'
						}
					/>
					<script
						type="text/javascript"
						src="https://hm.baidu.com/hm.js?cd6161d5e51d61010aba6e8501243c00"
					/>
					<script>window._hmt = _hmt || [];</script>
					<script
						type="text/javascript"
						src="https://api.map.baidu.com/api?v=2.0&ak=kX7x3dO6jj5zGMfQKbSbAvbMENGEIvja"
					/>
					<script>
						window.BMap = BMap;
						window.BMapLib = BMapLib;
					</script>
					<link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
					<link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
				</Head>
				<body className="custom_class">
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
