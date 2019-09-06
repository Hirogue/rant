import gql from 'graphql-tag';

export const F_APPLY_PROVIDER_FIELDS = gql`
  fragment ApplyProviderFields on ApplyProvider {
    id
    update_at
    create_at
    applicant {
      id
      realname
      phone
    }
    provider {
      id
      name
      logo
      category {
        id
        title
      }
      creator {
        id
        phone
        realname
      }
    }    
  }
`;

export const Q_GET_APPLY_PROVIDERS = gql`
  ${F_APPLY_PROVIDER_FIELDS}

  query queryApplyProvider($queryString: String!) {
    queryApplyProvider(queryString: $queryString) {
      total
      page
      pageCount
      data {
        ...ApplyProviderFields
      }
    }
  }
`;

export const Q_GET_APPLY_PROVIDER = gql`
  ${F_APPLY_PROVIDER_FIELDS}

  query getApplyProvider($id: String!, $queryString: String! = "") {
    applyProvider(id: $id, queryString: $queryString) {
      ...ApplyProviderFields
    }
  }
`;

export const M_UPDATE_APPLY_PROVIDER = gql`
  ${F_APPLY_PROVIDER_FIELDS}

  mutation updateApplyProvider($id: String!, $data: ApplyProviderInput!) {
    updateApplyProvider(id: $id, data: $data) {
      ...ApplyProviderFields
    }
  }
`;

export const M_CREATE_APPLY_PROVIDER = gql`
  ${F_APPLY_PROVIDER_FIELDS}

  mutation createApplyProvider($data: ApplyProviderInput!) {
    createApplyProvider(data: $data) {
      ...ApplyProviderFields
    }
  }
`;

export const M_DELETE_APPLY_PROVIDER = gql`
  mutation deleteApplyProvider($ids: String!) {
    deleteApplyProvider(ids: $ids)
  }
`;
