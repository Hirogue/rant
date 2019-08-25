import gql from 'graphql-tag';

export const F_SUCCESS_CASE_FIELDS = gql`
  fragment SuccessCaseFields on SuccessCase {
    id
    title
    cover
    is_published
    sort
    summary
    publish_at
    update_at
    create_at
  }
`;

export const Q_GET_SUCCESS_CASES = gql`
  ${F_SUCCESS_CASE_FIELDS}

  query querySuccessCase($queryString: String!) {
    querySuccessCase(queryString: $queryString) {
      total
      page
      pageCount
      data {
        ...SuccessCaseFields
      }
    }
  }
`;

export const Q_GET_SUCCESS_CASE = gql`
  ${F_SUCCESS_CASE_FIELDS}
  query getSuccessCase($id: String!, $queryString: String! = "") {
    successCase(id: $id, queryString: $queryString) {
      ...SuccessCaseFields
    }
  }
`;

export const M_UPDATE_SUCCESS_CASE = gql`
  ${F_SUCCESS_CASE_FIELDS}

  mutation updateSuccessCase($id: String!, $data: SuccessCaseInput!) {
    updateSuccessCase(id: $id, data: $data) {
      ...SuccessCaseFields
    }
  }
`;

export const M_CREATE_SUCCESS_CASE = gql`
  ${F_SUCCESS_CASE_FIELDS}

  mutation createSuccessCase($data: SuccessCaseInput!) {
    createSuccessCase(data: $data) {
      ...SuccessCaseFields
    }
  }
`;

export const M_DELETE_SUCCESS_CASE = gql`
  mutation deleteSuccessCase($ids: String!) {
    deleteSuccessCase(ids: $ids)
  }
`;
