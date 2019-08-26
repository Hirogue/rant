import gql from 'graphql-tag';

export const F_ROLE_FIELDS = gql`
  fragment RoleFields on Role {
    id
    name
    update_at
    create_at
  }
`;

export const Q_GET_ROLES = gql`
  ${F_ROLE_FIELDS}

  query queryRole($queryString: String!) {
    queryRole(queryString: $queryString) {
      total
      page
      pageCount
      data {
        ...RoleFields
      }
    }
  }
`;

export const Q_GET_ROLE = gql`
  ${F_ROLE_FIELDS}
  query getRole($id: String!, $queryString: String! = "") {
    role(id: $id, queryString: $queryString) {
      ...RoleFields
    }
  }
`;

export const M_UPDATE_ROLE = gql`
  ${F_ROLE_FIELDS}

  mutation updateRole($id: String!, $data: RoleInput!) {
    updateRole(id: $id, data: $data) {
      ...RoleFields
    }
  }
`;

export const M_CREATE_ROLE = gql`
  ${F_ROLE_FIELDS}

  mutation createRole($data: RoleInput!) {
    createRole(data: $data) {
      ...RoleFields
    }
  }
`;

export const M_DELETE_ROLE = gql`
  mutation deleteRole($ids: String!) {
    deleteRole(ids: $ids)
  }
`;
