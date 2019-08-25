import gql from 'graphql-tag';

export const F_SEO_FIELDS = gql`
  fragment SeoFields on Seo {
    id
    path
    title
    keywords
    description
    update_at
    create_at
  }
`;

export const Q_GET_SEOS = gql`
  ${F_SEO_FIELDS}

  query querySeo($queryString: String!) {
    querySeo(queryString: $queryString) {
      total
      page
      pageCount
      data {
        ...SeoFields
      }
    }
  }
`;

export const Q_GET_SEO = gql`
  ${F_SEO_FIELDS}
  query getSeo($id: String!, $queryString: String! = "") {
    seo(id: $id, queryString: $queryString) {
      ...SeoFields
    }
  }
`;

export const M_UPDATE_SEO = gql`
  ${F_SEO_FIELDS}

  mutation updateSeo($id: String!, $data: SeoInput!) {
    updateSeo(id: $id, data: $data) {
      ...SeoFields
    }
  }
`;

export const M_CREATE_SEO = gql`
  ${F_SEO_FIELDS}

  mutation createSeo($data: SeoInput!) {
    createSeo(data: $data) {
      ...SeoFields
    }
  }
`;

export const M_DELETE_SEO = gql`
  mutation deleteSeo($ids: String!) {
    deleteSeo(ids: $ids)
  }
`;
