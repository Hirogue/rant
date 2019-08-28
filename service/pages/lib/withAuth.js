import React, { Component } from 'react';
import Router from 'next/router';
import * as Nprogress from 'nprogress';
import UUID from 'uuid';
import { apiStatistics } from '../services/common';

import 'nprogress/nprogress.css';

Router.onRouteChangeStart = (val) => {
	Nprogress.start();
};

Router.onRouteChangeComplete = (url) => {
	Nprogress.done();

	// console.log('env:', process.env.NODE_ENV);
	// console.log('url:', url);

	// let sessionID = localStorage.getItem('SESSION_ID');
	// if (!sessionID) {
	// 	sessionID = UUID.v4();
	// 	localStorage.setItem('SESSION_ID', sessionID);
	// }
	// apiStatistics({ url, sessionID });

	if (process.env.NODE_ENV !== 'production') {
		const els = document.querySelectorAll('link[href*="/_next/static/css/styles.chunk.css"]');
		els[0].href = '/_next/static/css/styles.chunk.css?v=' + new Date().valueOf();
	}
};

Router.onRouteChangeError = () => Nprogress.done();

export default function withAuth(App) {
	class WithAuth extends Component {
		render() {
			return <App {...this.props} />;
		}
	}

	return WithAuth;
}
