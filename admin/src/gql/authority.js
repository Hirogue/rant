import gql from 'graphql-tag';

export const F_AUTHORITY_FIELDS = gql`
  fragment AuthorityFields on Authority {
    id
    title
    value
    sort
  }
`;

export const F_AUTHORITY_RECURSIVE = gql`
  fragment AuthorityRecursive on Authority {
    ...AuthorityFields
    children {
      ...AuthorityFields
      children {
        ...AuthorityFields
        children {
          ...AuthorityFields
          children {
            ...AuthorityFields
            children {
              ...AuthorityFields
              children {
                ...AuthorityFields
                children {
                  ...AuthorityFields
                  children {
                    ...AuthorityFields
                    children {
                      ...AuthorityFields
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const Q_GET_AUTHORITY_TREES = gql`
  ${F_AUTHORITY_FIELDS}
  ${F_AUTHORITY_RECURSIVE}

  query getAuthorityTrees {
    authorityTrees {
      ...AuthorityRecursive
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
