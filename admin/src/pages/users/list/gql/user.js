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

export const Q_GET_USER_STATISTICS = gql`
  query getUserStatistics {
    userStatistics {
      all
      users
      investors
      financers
      providers
      tourists
      pendingCount
      rejectCount
    }
  }
`;

export const Q_GET_USER = gql`
  query getUser($id: String!) {
    user(id: $id) {
      ${USER_TYPE}
    }
  }
`;

export const Q_GET_USERS = gql`
  query getUsers(
    $queryString: String! = ""
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

export const M_UPDATE_USER = gql`
  mutation updateUser($updateUserData: UpdateUserInput!) {
    update(updateUserData: $updateUserData)
  }
`;
