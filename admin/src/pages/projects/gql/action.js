import gql from 'graphql-tag';

export const M_APPROVAL_PROJECT = gql`
  mutation approvalProject($data: ProjectInput!) {
    approvalProject(data: $data)
  }
`;
