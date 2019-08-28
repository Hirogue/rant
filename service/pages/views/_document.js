import Document, { Head, Main, NextScript } from 'next/document';

export default class extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);

		ctx.query.user = ctx.req.session.user;

		return { ...initialProps, ...ctx.query };
	}

	render() {
		return (
			<html>
				<Head>
					<script
						type="text/javascript"
						src="https://hm.baidu.com/hm.js?cd6161d5e51d61010aba6e8501243c00"
					/>
					<script>window._hmt = _hmt || [];</script>
					<script
						type="text/javascript"
						src="https://api.map.baidu.com/api?v=2.0&ak=kX7x3dO6jj5zGMfQKbSbAvbMENGEIvja"
					/>
					<script>window.BMap = BMap; window.BMapLib = BMapLib;</script>
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
