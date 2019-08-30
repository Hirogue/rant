import gql from 'graphql-tag';

export const M_APPROVAL_PROVIDER = gql`
  mutation approvalProvider($data: ProviderInput!) {
    approvalProvider(data: $data)
  }
`;
