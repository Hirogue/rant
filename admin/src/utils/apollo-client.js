import Config from '@/config';
import Logger from '@/utils/logger';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink, from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';

Logger.log('config apollo:', Config.apollo);

const httpLink = new HttpLink({
  ...Config.apollo.link,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('token') || null,
    },
  });

  return forward(operation);
});

const errorHandler = onError(error => {
  Logger.error(error);
});

const client = new ApolloClient({
  link: from([authMiddleware, errorHandler, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
