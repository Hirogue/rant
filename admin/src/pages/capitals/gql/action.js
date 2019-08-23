import gql from 'graphql-tag';

export const M_APPROVAL_CAPITAL = gql`
  mutation approvalCapital($data: CapitalInput!) {
    approvalCapital(data: $data)
  }
`;
