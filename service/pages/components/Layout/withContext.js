import { message } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'next/router';
import React, { Component } from 'react';
import config from '../../config/config';
import withClient from '../../lib/client';
import { jump } from '../../lib/global';
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
            user: null,
            copyright: `指导单位：江西省文化和旅游厅 | Copyright © ${new Date().getFullYear()} 江西省旅游集团股份有限公司 |`,
            icp: '赣ICP备19002972号',
            icpLink: 'http://beian.miit.gov.cn/publish/query/indexFirst.action',
            picp: '赣公网安备:36010802000252号',
            picpLink: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36010802000252',
            hotLine: '0791-87705085',
            navMenus: [
                { name: '首页', url: '/' },
                { name: '项目招商', url: '/project' },
                { name: '金融资本', url: '/finance' },
                { name: '配套服务', url: '/service' },
                { name: '政策资讯', url: '/news' },
                { name: '江旅金融', url: '/product' },
                { name: '关于我们', url: '/about' },
                { name: '赣游通', url: 'http://2b.tolvyo.com/Login/Index' },
            ],
            links: [
                { name: '江西省文旅厅', url: 'http://dct.jiangxi.gov.cn/' },
                { name: '江西省旅游集团', url: 'http://www.jxto.com.cn/' },
                { name: '江旅科技', url: 'http://www.goyoto.com.cn/' },
                { name: '股权融资', url: 'https://www.lvyoto.com/finance?category=%E8%82%A1%E6%9D%83%E6%8A%95%E8%B5%84' },
                { name: '债权融资', url: 'https://www.lvyoto.com/finance?category=%E5%80%BA%E6%9D%83%E6%8A%95%E8%B5%84' },
                { name: '供应链金融', url: 'https://www.lvyoto.com/product?category=%E4%BE%9B%E5%BA%94%E9%93%BE%E9%87%91%E8%9E%8D%E4%BA%A7%E5%93%81' },
                { name: '投融资平台', url: 'https://www.lvyoto.com/' },
                { name: '投融资网', url: 'https://www.lvyoto.com/' },
                { name: '旅游产业', url: 'https://www.lvyoto.com/' },
                { name: '投融资项目平台', url: 'https://www.lvyoto.com/project' },
                { name: '项目投融资', url: 'https://www.lvyoto.com/project' },
                { name: '旅游投资', url: 'https://www.lvyoto.com/' },
            ],

            serviceAgreementVisible: false,
            setServiceAgreementVisible: status => { this.setState(state => ({ ...state, serviceAgreementVisible: status })) },

            setCurrentUser: (user) => { this.setState(state => ({ ...state, user })) },
            logout: this.logout
        }

        componentDidMount() {
            const user = localStorage.getItem('u_user');

            if (!!user) {
                this.setState(state => ({ ...state, user: JSON.parse(user) }));
            }
        }

        logout() {
            localStorage.removeItem('u_user');
            jump('/');
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
