import gql from 'graphql-tag';

export const F_APPLY_PRODUCT_FIELDS = gql`
  fragment ApplyProductFields on ApplyProduct {
    id
    reason
    status
    update_at
    create_at
    applicant {
      id
      realname
      phone
    }
    product {
      id
      name
    }
    org {
      id
      title
    }
    own {
      id
      realname
    }
  }
`;

export const Q_GET_APPLY_PRODUCTS = gql`
  ${F_APPLY_PRODUCT_FIELDS}

  query queryApplyProduct($queryString: String!) {
    queryApplyProduct(queryString: $queryString) {
      total
      page
      pageCount
      data {
        ...ApplyProductFields
      }
    }
  }
`;

export const Q_GET_APPLY_PRODUCT = gql`
  ${F_APPLY_PRODUCT_FIELDS}

  query getApplyProduct($id: String!, $queryString: String! = "") {
    applyProduct(id: $id, queryString: $queryString) {
      ...ApplyProductFields
    }
  }
`;

export const M_UPDATE_APPLY_PRODUCT = gql`
  ${F_APPLY_PRODUCT_FIELDS}

  mutation updateApplyProduct($id: String!, $data: ApplyProductInput!) {
    updateApplyProduct(id: $id, data: $data) {
      ...ApplyProductFields
    }
  }
`;

export const M_CREATE_APPLY_PRODUCT = gql`
  ${F_APPLY_PRODUCT_FIELDS}

  mutation createApplyProduct($data: ApplyProductInput!) {
    createApplyProduct(data: $data) {
      ...ApplyProductFields
    }
  }
`;

export const M_DELETE_APPLY_PRODUCT = gql`
  mutation deleteApplyProduct($ids: String!) {
    deleteApplyProduct(ids: $ids)
  }
`;
