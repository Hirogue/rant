import gql from 'graphql-tag';
import { F_ORG_FIELDS, F_ORG_RECURSIVE } from './org';
import { F_METADATA_FIELDS, F_METADATA_RECURSIVE } from './metadata';

export const F_USER_FIELDS = gql`
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
    address
    company
    profile
    identity
    status
    vip
    org {
      ...OrgFields
    }
    area {
      ...MetadataFields
    }
  }
`;

export const Q_GET_USERS = gql`
  ${F_USER_FIELDS}
  ${F_ORG_FIELDS}
  ${F_ORG_RECURSIVE}
  ${F_METADATA_RECURSIVE}

  query queryUser($queryString: String!, $metadataRoot: String! = "") {
    queryUser(queryString: $queryString) {
      total
      page
      pageCount
      data {
        ...UserFields
      }
    }

    orgTrees {
      ...OrgRecursive
    }

    metadataDescendantsTree(root: $metadataRoot) {
      ...MetadataRecursive
    }
  }
`;

export const Q_GET_USER = gql`
  ${F_USER_FIELDS}
  ${F_ORG_FIELDS}
  ${F_ORG_RECURSIVE}

  query user($id: String!, $queryString: String! = "") {
    user(id: $id, queryString: $queryString) {
      ...UserFields
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
