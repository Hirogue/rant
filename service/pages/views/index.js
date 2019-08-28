import React, { Component, Fragment } from 'react';
import { withRouter } from 'next/router';
import { ApolloProvider } from "react-apollo";
import BaseLayout from '../components/Layout/BaseLayout';
import BannerMod from '../partials/home/Banner';
import NoticeAdvantage from '../partials/home/NoticeAdvantage';
import FindCapital from '../partials/home/FindCapital';
import ServerTeam from '../partials/home/ServerTeam';
import ServiceNews from '../partials/home/ServiceNews';
import IndexNav from '../partials/home/IndexNav';
import SuccessCase from '../partials/home/SuccessCase';
import GlobalContext from '../components/context/GlobalContext';
import { withApollo, createApolloClient } from "../lib/apollo";

const client = createApolloClient();

@withApollo
@withRouter
export default class extends Component {

	toRenderContent = (context) => {
		const { data } = this.props.router.query;

		const siteInfo = context.siteInfo || { aboutData: [] };
		const mainData = context.mainData || {};
		

		return (
			<Fragment>
				<IndexNav />
				<BannerMod />
				<NoticeAdvantage data={data || []} siteInfo={siteInfo || []} />
				<FindCapital />
				<SuccessCase data={data || []} />
				<ServerTeam data={data || []} />
				<ServiceNews data={data || []} mainData={mainData || []} />
			</Fragment>
		);
	}

	render() {
		return (
			<BaseLayout>
				<GlobalContext.Consumer>
					{this.toRenderContent}
				</GlobalContext.Consumer>
			</BaseLayout>
		);
	}
}
