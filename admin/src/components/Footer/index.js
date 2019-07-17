import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

export default () => <Footer style={{ textAlign: 'center' }}>Rant ©{new Date().getFullYear()} Created by RantStack</Footer>