import gql from 'graphql-tag';

export const M_APPROVAL_USER = gql`
  mutation approvalUser($data: UserInput!) {
    approvalUser(data: $data)
  }
`;
