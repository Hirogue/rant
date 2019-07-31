import gql from 'graphql-tag';

const F_ORG_RECURSIVE = gql`
  fragment OrgRecursive on Org {
    ...OrgFields
    children {
      ...OrgFields
      children {
        ...OrgFields
        children {
          ...OrgFields
          children {
            ...OrgFields
            children {
              ...OrgFields
              children {
                ...OrgFields
                children {
                  ...OrgFields
                  children {
                    ...OrgFields
                    children {
                      ...OrgFields
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

const F_ORG_FILEDS = gql`
  fragment OrgFields on Org {
    id
    title
    sort
  }
`;

export const Q_GET_ORG_TREES = gql`
  ${F_ORG_FILEDS}
  ${F_ORG_RECURSIVE}

  query getOrgTrees {
    orgTrees {
      ...OrgRecursive
    }
  }
`;

export const Q_GET_ORG = gql`
  ${F_ORG_FILEDS}

  query getOrg($id: String!, $queryString: String! = "") {
    org(id: $id, queryString: $queryString) {
      ...OrgFields
    }
  }
`;

export const M_UPDATE_ORG = gql`
  ${F_ORG_FILEDS}

  mutation updateOrg($id: String!, $data: OrgInput!) {
    updateOrg(id: $id, data: $data) {
      ...OrgFields
    }
  }
`;

export const M_CREATE_ORG = gql`
  ${F_ORG_FILEDS}

  mutation createOrg($data: OrgInput!) {
    createOrg(data: $data) {
      ...OrgFields
    }
  }
`;

export const M_DELETE_ORG = gql`
  mutation deleteOrg($ids: String!) {
    deleteOrg(ids: $ids)
  }
`;
