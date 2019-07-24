import gql from 'graphql-tag';

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
