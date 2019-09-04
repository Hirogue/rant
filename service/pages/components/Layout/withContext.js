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
        render() {

            return (
                <GlobalContext.Provider value={{ router: this.props.router, ...config }}>
                    <Consult siteInfo={{}} />
                    <App props={this.props} />
                </GlobalContext.Provider>
            )
        }
    }

    return WithContext;
}
