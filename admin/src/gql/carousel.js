import gql from 'graphql-tag';

export const F_CAROUSEL_FIELDS = gql`
  fragment CarouselFields on Carousel {
    id
    title
    url
    link
    is_published
    sort
    update_at
    create_at
  }
`;

export const Q_GET_CAROUSELS = gql`
  ${F_CAROUSEL_FIELDS}

  query queryCarousel($queryString: String!) {
    queryCarousel(queryString: $queryString) {
      total
      page
      pageCount
      data {
        ...CarouselFields
      }
    }
  }
`;

export const Q_GET_CAROUSEL = gql`
  ${F_CAROUSEL_FIELDS}
  query getCarousel($id: String!, $queryString: String! = "") {
    carousel(id: $id, queryString: $queryString) {
      ...CarouselFields
    }
  }
`;

export const M_UPDATE_CAROUSEL = gql`
  ${F_CAROUSEL_FIELDS}

  mutation updateCarousel($id: String!, $data: CarouselInput!) {
    updateCarousel(id: $id, data: $data) {
      ...CarouselFields
    }
  }
`;

export const M_CREATE_CAROUSEL = gql`
  ${F_CAROUSEL_FIELDS}

  mutation createCarousel($data: CarouselInput!) {
    createCarousel(data: $data) {
      ...CarouselFields
    }
  }
`;

export const M_DELETE_CAROUSEL = gql`
  mutation deleteCarousel($ids: String!) {
    deleteCarousel(ids: $ids)
  }
`;
