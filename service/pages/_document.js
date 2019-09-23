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
					<meta
						key="keywords"
						name="keywords"
						content={seo.keywords}
					/>
					<meta
						key="description"
						name="description"
						content={seo.description}
					/>
					<link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
					<link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
