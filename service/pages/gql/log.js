import gql from 'graphql-tag';

export const F_LOG_FIELDS = gql`
  fragment LogFields on Log {
    id
    target
    type
    info
    status
    update_at
    create_at
  }
`;

export const Q_GET_LOGS = gql`
  ${F_LOG_FIELDS}

  query queryLog($queryString: String!) {
    queryLog(queryString: $queryString) {
      total
      page
      pageCount
      data {
        ...LogFields
      }
    }
  }
`;

export const Q_GET_LOG = gql`
  ${F_LOG_FIELDS}
  query getLog($id: String!, $queryString: String! = "") {
    log(id: $id, queryString: $queryString) {
      ...LogFields
    }
  }
`;

export const M_UPDATE_LOG = gql`
  ${F_LOG_FIELDS}

  mutation updateLog($id: String!, $data: LogInput!) {
    updateLog(id: $id, data: $data) {
      ...LogFields
    }
  }
`;

export const M_CREATE_LOG = gql`
  ${F_LOG_FIELDS}

  mutation createLog($data: LogInput!) {
    createLog(data: $data) {
      ...LogFields
    }
  }
`;

export const M_DELETE_LOG = gql`
  mutation deleteLog($ids: String!) {
    deleteLog(ids: $ids)
  }
`;
