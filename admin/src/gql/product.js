import gql from 'graphql-tag';

export const Q_GET_PRODUCTS = gql`
  query getProducts($page: Int = 0, $pageSize: Int = 6, $keyword: String) {
    products(page: $page, pageSize: $pageSize, keyword: $keyword) {
      total
      page
      totalPage
      hasMore
      items {
        id
        create_at
        update_at
        name
        sort
        slug
        cover
        image
        introduce
        features
        flowsJson
        category {
          name
        }
      }
    }
  }
`;

export const Q_GET_PRODUCT_CATEGORIES = gql`
  query getProductCategories {
    productCategories {
      id
      name
      sort
      parent {
        id
        name
        sort
      }
      children {
        id
        name
        sort
      }
    }
  }
`;
