import { Layout } from 'antd';
import LoginHeader from "../LoginHeader";
import GlobalLayout from './GlobalLayout';
import './login_layout.scss';

const { Header, Content } = Layout;

export default props => {

	return (
		<GlobalLayout>
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
		</GlobalLayout>
	)
};