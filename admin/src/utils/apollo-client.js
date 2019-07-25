import Config from '@/config';
import Logger from '@/utils/logger';
import { message } from 'antd';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink, from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { formatMessage } from 'umi-plugin-react/locale';
import { router } from 'umi';

Logger.log('config apollo:', Config.apollo);

const httpLink = new HttpLink({
  ...Config.apollo.link,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  return forward(operation);
});

const errorHandler = onError(error => {
  Logger.error(error);

  const { graphQLErrors } = error;

  if (graphQLErrors && graphQLErrors.length > 0) {
    const result = graphQLErrors.shift();
    const errorMsg = formatMessage({
      id: result.message,
    });

    const errorCode = parseInt(result.extensions ? result.extensions.code : 0);

    Logger.log('error message:', errorMsg);
    Logger.log('error code:', errorCode);

    if (401 === errorCode) {
      message.error(formatMessage({ id: 'errors.invalid.auth' }));
      router.replace('/user/login');
      return false;
    }

    message.error(errorMsg);
    return false;
  }
});

const client = new ApolloClient({
  link: from([authMiddleware, errorHandler, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
