import gql from 'graphql-tag';
import { F_METADATA_FIELDS } from './metadata';

export const F_CUSTOMER_FIELDS = gql`
  ${F_METADATA_FIELDS}

  fragment CustomerFields on Customer {
    id
    create_at
    update_at
    realname
    phone
    company
    status
    area_path
    ex_info
    area {
      ...MetadataFields
    }
  }
`;

export const Q_GET_CUSTOMERS = gql`
  ${F_CUSTOMER_FIELDS}

  query queryCustomer($queryString: String!) {
    queryCustomer(queryString: $queryString) {
      total
      page
      pageCount
      data {
        ...CustomerFields
      }
    }
  }
`;

export const Q_GET_CUSTOMER = gql`
  ${F_CUSTOMER_FIELDS}

  query customer($id: String!, $queryString: String! = "") {
    customer(id: $id, queryString: $queryString) {
      ...CustomerFields
    }
  }
`;

export const M_UPDATE_CUSTOMER = gql`
  ${F_CUSTOMER_FIELDS}

  mutation updateCustomer($id: String!, $data: CustomerInput!) {
    updateCustomer(id: $id, data: $data) {
      ...CustomerFields
    }
  }
`;

export const M_CREATE_CUSTOMER = gql`
  ${F_CUSTOMER_FIELDS}

  mutation createCustomer($data: CustomerInput!) {
    createCustomer(data: $data) {
      ...CustomerFields
    }
  }
`;

export const M_DELETE_CUSTOMER = gql`
  mutation deleteCustomer($ids: String!) {
    deleteCustomer(ids: $ids)
  }
`;
