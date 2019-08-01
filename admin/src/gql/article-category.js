import gql from 'graphql-tag';
import { F_ARTICLE_CATEGORY_FIELDS, F_ARTICLE_CATEGORYRECURSIVE } from './fragment';

export const Q_GET_ARTICLE_CATEGORY_TREES = gql`
  ${F_ARTICLE_CATEGORY_FIELDS}
  ${F_ARTICLE_CATEGORYRECURSIVE}

  query getArticleCategoryTrees {
    articleCategoryTrees {
      ...ArticleCategoryRecursive
    }
  }
`;

export const Q_GET_ARTICLE_CATEGORY = gql`
  ${F_ARTICLE_CATEGORY_FIELDS}

  query getArticleCategory($id: String!, $queryString: String! = "") {
    articleCategory(id: $id, queryString: $queryString) {
      ...ArticleCategoryFields
    }
  }
`;

export const M_UPDATE_ARTICLE_CATEGORY = gql`
  ${F_ARTICLE_CATEGORY_FIELDS}

  mutation updateArticleCategoryInput($id: String!, $data: ArticleCategoryInput!) {
    updateArticleCategory(id: $id, data: $data) {
      ...ArticleCategoryFields
    }
  }
`;

export const M_CREATE_ARTICLE_CATEGORY = gql`
  ${F_ARTICLE_CATEGORY_FIELDS}

  mutation createArticleCategory($data: ArticleCategoryInput!) {
    createArticleCategory(data: $data) {
      ...ArticleCategoryFields
    }
  }
`;

export const M_DELETE_ARTICLE_CATEGORY = gql`
  mutation deleteArticleCategory($ids: String!) {
    deleteArticleCategory(ids: $ids)
  }
`;
