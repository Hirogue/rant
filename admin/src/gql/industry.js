import gql from 'graphql-tag';

export const F_INDUSTRY_FIELDS = gql`
  fragment IndustryFields on Industry {
    id
    title
    sort
  }
`;

export const F_INDUSTRY_RECURSIVE = gql`
  fragment IndustryRecursive on Industry {
    ...IndustryFields
    children {
      ...IndustryFields
      children {
        ...IndustryFields
        children {
          ...IndustryFields
          children {
            ...IndustryFields
            children {
              ...IndustryFields
              children {
                ...IndustryFields
                children {
                  ...IndustryFields
                  children {
                    ...IndustryFields
                    children {
                      ...IndustryFields
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

export const Q_GET_INDUSTRY_TREES = gql`
  ${F_INDUSTRY_FIELDS}
  ${F_INDUSTRY_RECURSIVE}

  query getIndustryTrees {
    industryTrees {
      ...IndustryRecursive
    }
  }
`;

export const Q_GET_INDUSTRY = gql`
  ${F_INDUSTRY_FIELDS}

  query getIndustry($id: String!, $queryString: String! = "") {
    industry(id: $id, queryString: $queryString) {
      ...IndustryFields
    }
  }
`;

export const M_UPDATE_INDUSTRY = gql`
  ${F_INDUSTRY_FIELDS}

  mutation updateIndustry($id: String!, $data: IndustryInput!) {
    updateIndustry(id: $id, data: $data) {
      ...IndustryFields
    }
  }
`;

export const M_CREATE_INDUSTRY = gql`
  ${F_INDUSTRY_FIELDS}

  mutation createIndustry($data: IndustryInput!) {
    createIndustry(data: $data) {
      ...IndustryFields
    }
  }
`;

export const M_DELETE_INDUSTRY = gql`
  mutation deleteIndustry($ids: String!) {
    deleteIndustry(ids: $ids)
  }
`;
