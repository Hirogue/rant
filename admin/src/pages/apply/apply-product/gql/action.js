import gql from 'graphql-tag';

export const M_APPROVAL_APPLY_PRODUCT = gql`
  mutation approvalApplyProduct($data: ApplyProductInput!) {
    approvalApplyProduct(data: $data)
  }
`;
