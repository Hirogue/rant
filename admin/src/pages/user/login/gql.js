import gql from 'graphql-tag';

export const M_LOGIN = gql`
  mutation login($loginData: LoginInput!) {
    login(loginData: $loginData) {
      token
    }
  }
`;

export const Q_ME = gql`
  query me {
    me {
      id
      account
    }
  }
`;
