import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from '@/utils/apollo-client';

const Layout = ({ children }) => <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;

export default Layout;
