import gql from 'graphql-tag';

export const M_LOGIN = gql`
  mutation login($loginData: LoginInput!) {
    login(loginData: $loginData) {
      token
    }
  }
`;

export const Q_FETCH_CURRENT_USER = gql`
  query fetchCurrentUser {
    me {
      id
      account
      avatar
      realname
      profile
    }
  }
`;
