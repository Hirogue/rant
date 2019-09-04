import { message } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'next/router';
import React, { Component } from 'react';
import config from '../../config/config';
import withClient from '../../lib/client';
import Consult from '../Consult';
import './reset.scss';

message.config({
    top: 300,
    duration: 2,
    maxCount: 2,
});

export const GlobalContext = React.createContext();

export default App => {
    @withRouter
    @withClient
    class WithContext extends Component {

        state = {
            serviceAgreementVisible: false,
            setServiceAgreementVisible: status => { this.setState(state => ({ ...state, serviceAgreementVisible: status })) }
        }

        render() {
            return (
                <GlobalContext.Provider value={{ ...this.state, router: this.props.router, ...config }}>
                    <Consult siteInfo={{}} />
                    <App props={this.props} />
                </GlobalContext.Provider>
            )
        }
    }

    return WithContext;
}
