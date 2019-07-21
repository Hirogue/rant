import { gql } from 'apollo-boost';

export const M_LOGIN = gql`
  mutation login {
    login(loginData: { account: "SuperAdmin", password: "12345678" }) {
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
