import ApolloClient, { InMemoryCache } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:3000/graphql',
  cache: new InMemoryCache(),
});

export default client;
