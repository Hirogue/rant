import App, { Container } from 'next/app';
import React from 'react';
import withAuth from '../lib/withAuth';

@withAuth
export default class extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<Container>
				<Component {...pageProps} />
			</Container>
		);
	}
}
