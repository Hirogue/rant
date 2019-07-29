import gql from 'graphql-tag';

export const USER_TYPE = `
  id
  create_at
  update_at
  account
  avatar
  realname
  phone
  idcard
  address
  company
  profile
  identity
  status
`;

export const Q_GET_USERS = gql`
  query getUsers(
    $queryString: String!
  ) {
    users(     
      queryString: $queryString  
    ) {
      total
      page
      pageCount    
      data {
        ${USER_TYPE}
      }
    }
  }
`;

export const Q_GET_USER = gql`
  query getUser($id: String!, $queryString: String! = "") {
    user(id: $id, queryString: $queryString) {
      ${USER_TYPE}
    }
  }
`;

export const M_UPDATE_USER = gql`
  mutation updateUser($id: String!, $data: UserInput!) {
    updateUser(id: $id, data: $data)
  }
`;

export const M_CREATE_USER = gql`
  mutation createUser($data: UserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;

export const M_DELETE_USER = gql`
  mutation deleteUser($ids: String!) {
    deleteUser(ids: $ids)
  }
`;
