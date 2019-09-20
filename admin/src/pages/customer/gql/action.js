import gql from 'graphql-tag';

export const M_APPROVAL_CUSTOMER = gql`
  mutation approvalCustomer($data: CustomerInput!) {
    approvalCustomer(data: $data)
  }
`;
