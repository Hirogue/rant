import gql from 'graphql-tag';

export const M_UPDATE_GRANTS = gql`
  mutation updateGrants($id: String!, $data: RoleInput!) {
    updateGrants(id: $id, data: $data)
  }
`;
