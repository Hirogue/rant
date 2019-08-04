import gql from 'graphql-tag';

export const F_CAPITAL_TYPE_FIELDS = gql`
  fragment CapitalTypeFields on CapitalType {
    id
    title
    sort
  }
`;

export const F_CAPITAL_TYPE_RECURSIVE = gql`
  fragment CapitalTypeRecursive on CapitalType {
    ...CapitalTypeFields
    children {
      ...CapitalTypeFields
      children {
        ...CapitalTypeFields
        children {
          ...CapitalTypeFields
          children {
            ...CapitalTypeFields
            children {
              ...CapitalTypeFields
              children {
                ...CapitalTypeFields
                children {
                  ...CapitalTypeFields
                  children {
                    ...CapitalTypeFields
                    children {
                      ...CapitalTypeFields
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

export const Q_GET_CAPITAL_TYPE_TREES = gql`
  ${F_CAPITAL_TYPE_FIELDS}
  ${F_CAPITAL_TYPE_RECURSIVE}

  query getCapitalTypeTrees {
    capitalTypeTrees {
      ...CapitalTypeRecursive
    }
  }
`;

export const Q_GET_CAPITAL_TYPE = gql`
  ${F_CAPITAL_TYPE_FIELDS}

  query getCapitalType($id: String!, $queryString: String! = "") {
    capitalType(id: $id, queryString: $queryString) {
      ...CapitalTypeFields
    }
  }
`;

export const M_UPDATE_CAPITAL_TYPE = gql`
  ${F_CAPITAL_TYPE_FIELDS}

  mutation updateCapitalType($id: String!, $data: CapitalTypeInput!) {
    updateCapitalType(id: $id, data: $data) {
      ...CapitalTypeFields
    }
  }
`;

export const M_CREATE_CAPITAL_TYPE = gql`
  ${F_CAPITAL_TYPE_FIELDS}

  mutation createCapitalType($data: CapitalTypeInput!) {
    createCapitalType(data: $data) {
      ...CapitalTypeFields
    }
  }
`;

export const M_DELETE_CAPITAL_TYPE = gql`
  mutation deleteCapitalType($ids: String!) {
    deleteCapitalType(ids: $ids)
  }
`;
