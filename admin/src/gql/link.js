import gql from 'graphql-tag';

export const F_LINK_FIELDS = gql`
  fragment LinkFields on Link {
    id
    name
    url
    sort
    update_at
    create_at
  }
`;

export const Q_GET_LINKS = gql`
  ${F_LINK_FIELDS}

  query queryLink($queryString: String!) {
    queryLink(queryString: $queryString) {
      total
      page
      pageCount
      data {
        ...LinkFields
      }
    }
  }
`;

export const Q_GET_LINK = gql`
  ${F_LINK_FIELDS}
  query getLink($id: String!, $queryString: String! = "") {
    link(id: $id, queryString: $queryString) {
      ...LinkFields
    }
  }
`;

export const M_UPDATE_LINK = gql`
  ${F_LINK_FIELDS}

  mutation updateLink($id: String!, $data: LinkInput!) {
    updateLink(id: $id, data: $data) {
      ...LinkFields
    }
  }
`;

export const M_CREATE_LINK = gql`
  ${F_LINK_FIELDS}

  mutation createLink($data: LinkInput!) {
    createLink(data: $data) {
      ...LinkFields
    }
  }
`;

export const M_DELETE_LINK = gql`
  mutation deleteLink($ids: String!) {
    deleteLink(ids: $ids)
  }
`;
