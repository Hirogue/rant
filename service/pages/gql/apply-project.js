import gql from 'graphql-tag';

export const F_APPLY_PROJECT_FIELDS = gql`
  fragment ApplyProjectFields on ApplyProject {
    id
    update_at
    create_at
    applicant {
      id
      realname
      phone
    }
    project {
      id
      title
      cover
      creator {
        id
        phone
        realname
      }
    }
  }
`;

export const Q_GET_APPLY_PROJECTS = gql`
  ${F_APPLY_PROJECT_FIELDS}

  query queryApplyProject($queryString: String!) {
    queryApplyProject(queryString: $queryString) {
      total
      page
      pageCount
      data {
        ...ApplyProjectFields
      }
    }
  }
`;

export const Q_GET_APPLY_PROJECT = gql`
  ${F_APPLY_PROJECT_FIELDS}

  query getApplyProject($id: String!, $queryString: String! = "") {
    applyProject(id: $id, queryString: $queryString) {
      ...ApplyProjectFields
    }
  }
`;

export const M_UPDATE_APPLY_PROJECT = gql`
  ${F_APPLY_PROJECT_FIELDS}

  mutation updateApplyProject($id: String!, $data: ApplyProjectInput!) {
    updateApplyProject(id: $id, data: $data) {
      ...ApplyProjectFields
    }
  }
`;

export const M_CREATE_APPLY_PROJECT = gql`
  ${F_APPLY_PROJECT_FIELDS}

  mutation createApplyProject($data: ApplyProjectInput!) {
    createApplyProject(data: $data) {
      ...ApplyProjectFields
    }
  }
`;

export const M_DELETE_APPLY_PROJECT = gql`
  mutation deleteApplyProject($ids: String!) {
    deleteApplyProject(ids: $ids)
  }
`;
