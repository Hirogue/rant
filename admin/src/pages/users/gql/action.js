import gql from 'graphql-tag';

export const M_ADMIN_APPROVAL = gql`
  mutation adminApproval($data: AdminApprovalInput!) {
    adminApproval(data: $data)
  }
`;
