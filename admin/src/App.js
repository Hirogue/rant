import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import moment from 'moment';

import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import './App.css';

import BaseLayout from '@/layouts/BaseLayout';
import UserLayout from '@/layouts/UserLayout';

moment.locale('zh-cn');

export default () => (
  <LocaleProvider locale={zh_CN}>
    <Router>
      <Switch>

        <Route exact path="/" >
          <Redirect to="/studio/home" />
        </Route>
        <Route exact path="/studio" >
          <Redirect to="/studio/home" />
        </Route>
        <Route path="/studio/:page" component={BaseLayout} />

        <Route exact path="/user" component={UserLayout} >
          <Redirect to="/user/login" />
        </Route>
        <Route path="/user/:page" component={UserLayout} />

      </Switch>
    </Router>
  </LocaleProvider>
);
