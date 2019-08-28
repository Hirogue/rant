import Head from 'next/head';

export default (props) => {
	const seo = props.seo || {};

	return (
		<div>
			<Head>
				<title key="title">{seo.title || "旅游项目通"}</title>
				<meta key="keywords" name="Keywords" content={seo.seo} />
				<meta key="description" name="Description" content={seo.description} />
			</Head>
		</div>
	);
};
