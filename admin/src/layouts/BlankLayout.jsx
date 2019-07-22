import React from 'react';
import { BackTop } from 'antd';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from '@/utils/apollo-client';

const Layout = ({ children }) => (
  <ApolloProvider client={apolloClient}>
    {children}
    <BackTop />
  </ApolloProvider>
);

export default Layout;
