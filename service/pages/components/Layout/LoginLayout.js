import { Layout } from 'antd';
import Head from "next/head";
import LoginHeader from "../LoginHeader";
import withContext from './withContext';

import './login_layout.scss';

const { Header, Content } = Layout;

export default withContext(({ props }) => {

	return (
		<Layout>
			<Head seo={{}} />
			<Header
				style={{
					position: 'fixed',
					zIndex: 500,
					width: '100%',
					backgroundColor: '#2e8df3',
					height: 72
				}}
			>
				<LoginHeader />
			</Header>
			<Content style={{ paddingTop: 72, paddingBottom: 255 }}>
				{props.children}
			</Content>
		</Layout>
	)
});