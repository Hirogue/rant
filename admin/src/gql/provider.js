import gql from 'graphql-tag';
import { F_AREA_FIELDS, F_AREA_RECURSIVE } from './area';
import { F_USER_FIELDS } from './user';
import { F_PROVIDER_CATEGORY_FIELDS, F_PROVIDER_CATEGORYRECURSIVE } from './provider-category';

export const F_PROVIDER_FIELDS = gql`
  ${F_PROVIDER_CATEGORY_FIELDS}
  ${F_AREA_FIELDS}
  ${F_USER_FIELDS}

  fragment ProviderFields on Provider {
    id
    name
    logo
    slogan
    introduction
    update_at
    create_at
    category {
      ...ProviderCategoryFields
    }
    area {
      ...AreaFields
    }
    creator {
      ...UserFields
    }
  }
`;

export const Q_GET_PROVIDERS = gql`
  ${F_PROVIDER_FIELDS}
  ${F_PROVIDER_CATEGORYRECURSIVE}
  ${F_AREA_RECURSIVE}

  query queryProvider($queryString: String!) {
    queryProvider(queryString: $queryString) {
      total
      page
      pageCount
      data {
        ...ProviderFields
      }
    }

    providerCategoryTrees {
      ...ProviderCategoryRecursive
    }

    areaTrees {
      ...AreaRecursive
    }
  }
`;

export const Q_GET_PROVIDER = gql`
  ${F_PROVIDER_FIELDS}
  ${F_PROVIDER_CATEGORYRECURSIVE}
  ${F_AREA_RECURSIVE}

  query getProvider($id: String!, $queryString: String! = "") {
    provider(id: $id, queryString: $queryString) {
      ...ProviderFields
    }

    providerCategoryTrees {
      ...ProviderCategoryRecursive
    }

    areaTrees {
      ...AreaRecursive
    }
  }
`;

export const M_UPDATE_PROVIDER = gql`
  ${F_PROVIDER_FIELDS}

  mutation updateProvider($id: String!, $data: ProviderInput!) {
    updateProvider(id: $id, data: $data) {
      ...ProviderFields
    }
  }
`;

export const M_CREATE_PROVIDER = gql`
  ${F_PROVIDER_FIELDS}

  mutation createProvider($data: ProviderInput!) {
    createProvider(data: $data) {
      ...ProviderFields
    }
  }
`;

export const M_DELETE_PROVIDER = gql`
  mutation deleteProvider($ids: String!) {
    deleteProvider(ids: $ids)
  }
`;
