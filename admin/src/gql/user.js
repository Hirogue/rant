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
    $page: Int = 0
    $pageSize: Int = 10
    $identity: String
    $keyword: String
    $status: Int = -1
  ) {
    users(
      page: $page
      pageSize: $pageSize
      identity: $identity
      keyword: $keyword
      status: $status
    ) {
      total
      page
      totalPage
      hasMore
      items {
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
