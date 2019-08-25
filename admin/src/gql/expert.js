import gql from 'graphql-tag';

export const F_EXPERT_FIELDS = gql`
  fragment ExpertFields on Expert {
    id
    name
    avatar
    category
    company
    position
    info
    is_published
    sort
    update_at
    create_at
  }
`;

export const Q_GET_EXPERTS = gql`
  ${F_EXPERT_FIELDS}

  query queryExpert($queryString: String!) {
    queryExpert(queryString: $queryString) {
      total
      page
      pageCount
      data {
        ...ExpertFields
      }
    }
  }
`;

export const Q_GET_EXPERT = gql`
  ${F_EXPERT_FIELDS}
  query getExpert($id: String!, $queryString: String! = "") {
    expert(id: $id, queryString: $queryString) {
      ...ExpertFields
    }
  }
`;

export const M_UPDATE_EXPERT = gql`
  ${F_EXPERT_FIELDS}

  mutation updateExpert($id: String!, $data: ExpertInput!) {
    updateExpert(id: $id, data: $data) {
      ...ExpertFields
    }
  }
`;

export const M_CREATE_EXPERT = gql`
  ${F_EXPERT_FIELDS}

  mutation createExpert($data: ExpertInput!) {
    createExpert(data: $data) {
      ...ExpertFields
    }
  }
`;

export const M_DELETE_EXPERT = gql`
  mutation deleteExpert($ids: String!) {
    deleteExpert(ids: $ids)
  }
`;
