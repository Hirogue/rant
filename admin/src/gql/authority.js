import gql from 'graphql-tag';

export const F_AUTHORITY_FIELDS = gql`
  fragment AuthorityFields on Authority {
    id
    name
    value
    update_at
    create_at
  }
`;

export const Q_GET_AUTHORITYS = gql`
  ${F_AUTHORITY_FIELDS}

  query queryAuthority($queryString: String!) {
    queryAuthority(queryString: $queryString) {
      total
      page
      pageCount
      data {
        ...AuthorityFields
      }
    }
  }
`;

export const Q_GET_AUTHORITY = gql`
  ${F_AUTHORITY_FIELDS}
  query getAuthority($id: String!, $queryString: String! = "") {
    authority(id: $id, queryString: $queryString) {
      ...AuthorityFields
    }
  }
`;

export const M_UPDATE_AUTHORITY = gql`
  ${F_AUTHORITY_FIELDS}

  mutation updateAuthority($id: String!, $data: AuthorityInput!) {
    updateAuthority(id: $id, data: $data) {
      ...AuthorityFields
    }
  }
`;

export const M_CREATE_AUTHORITY = gql`
  ${F_AUTHORITY_FIELDS}

  mutation createAuthority($data: AuthorityInput!) {
    createAuthority(data: $data) {
      ...AuthorityFields
    }
  }
`;

export const M_DELETE_AUTHORITY = gql`
  mutation deleteAuthority($ids: String!) {
    deleteAuthority(ids: $ids)
  }
`;
