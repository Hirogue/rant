import gql from 'graphql-tag';

export const M_APPROVAL_APPLY_EXPERT = gql`
  mutation approvalApplyExpert($data: ApplyExpertInput!) {
    approvalApplyExpert(data: $data)
  }
`;
