import gql from 'graphql-tag';
import { F_METADATA_FIELDS } from './metadata';
import { F_ORG_FIELDS, F_ORG_RECURSIVE } from './org';
import { F_ROLE_FIELDS } from './role';

export const F_USER_FIELDS = gql`
  ${F_ROLE_FIELDS}
  ${F_ORG_FIELDS}
  ${F_METADATA_FIELDS}

  fragment UserFields on User {
    id
    create_at
    update_at
    account
    avatar
    realname
    phone
    idcard
    idcardA
    idcardB
    address
    company
    profile
    identity
    type
    status
    reason
    vip
    area_path
    isSuperAdmin
    providers {
      id
      name
      status
      logo
      slogan
      category {
        id
        title
      }
      introduction
    }
    role {
      ...RoleFields
    }
    org {
      ...OrgFields
    }
    area {
      ...MetadataFields
    }
    own {
      id
      realname
    }
  }
`;

export const Q_GET_USERS = gql`
  ${F_USER_FIELDS}
  ${F_ROLE_FIELDS}

  query queryUser($queryString: String!) {
    queryUser(queryString: $queryString) {
      total
      page
      pageCount
      data {
        ...UserFields
      }
    }

    roles {
      ...RoleFields
    }
  }
`;

export const Q_GET_USER = gql`
  ${F_USER_FIELDS}
  ${F_ROLE_FIELDS}
  ${F_ORG_FIELDS}
  ${F_ORG_RECURSIVE}

  query user($id: String!, $queryString: String! = "") {
    user(id: $id, queryString: $queryString) {
      ...UserFields
    }

    roles {
      ...RoleFields
    }

    orgTrees {
      ...OrgRecursive
    }
  }
`;

export const M_UPDATE_USER = gql`
  ${F_USER_FIELDS}

  mutation updateUser($id: String!, $data: UserInput!) {
    updateUser(id: $id, data: $data) {
      ...UserFields
    }
  }
`;

export const M_CREATE_USER = gql`
  ${F_USER_FIELDS}

  mutation createUser($data: UserInput!) {
    createUser(data: $data) {
      ...UserFields
    }
  }
`;

export const M_DELETE_USER = gql`
  mutation deleteUser($ids: String!) {
    deleteUser(ids: $ids)
  }
`;
