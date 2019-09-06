import gql from 'graphql-tag';

export const F_APPLY_CAPITAL_FIELDS = gql`
  fragment ApplyCapitalFields on ApplyCapital {
    id
    update_at
    create_at
    applicant {
      id
      realname
      phone
    }
    capital {
      id
      title
      creator {
        id
        phone
        realname
      }
    }
  }
`;

export const Q_GET_APPLY_CAPITALS = gql`
  ${F_APPLY_CAPITAL_FIELDS}

  query queryApplyCapital($queryString: String!) {
    queryApplyCapital(queryString: $queryString) {
      total
      page
      pageCount
      data {
        ...ApplyCapitalFields
      }
    }
  }
`;

export const Q_GET_APPLY_CAPITAL = gql`
  ${F_APPLY_CAPITAL_FIELDS}

  query getApplyCapital($id: String!, $queryString: String! = "") {
    applyCapital(id: $id, queryString: $queryString) {
      ...ApplyCapitalFields
    }
  }
`;

export const M_UPDATE_APPLY_CAPITAL = gql`
  ${F_APPLY_CAPITAL_FIELDS}

  mutation updateApplyCapital($id: String!, $data: ApplyCapitalInput!) {
    updateApplyCapital(id: $id, data: $data) {
      ...ApplyCapitalFields
    }
  }
`;

export const M_CREATE_APPLY_CAPITAL = gql`
  ${F_APPLY_CAPITAL_FIELDS}

  mutation createApplyCapital($data: ApplyCapitalInput!) {
    createApplyCapital(data: $data) {
      ...ApplyCapitalFields
    }
  }
`;

export const M_DELETE_APPLY_CAPITAL = gql`
  mutation deleteApplyCapital($ids: String!) {
    deleteApplyCapital(ids: $ids)
  }
`;
