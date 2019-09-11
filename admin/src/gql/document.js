import gql from 'graphql-tag';
import { F_DOCUMENT_CATEGORY_FIELDS, F_DOCUMENT_CATEGORYRECURSIVE } from './document-category';

export const F_DOCUMENT_FIELDS = gql`
  ${F_DOCUMENT_CATEGORY_FIELDS}

  fragment DocumentFields on Document {
    id
    title
    author
    source
    cover
    is_top
    is_published
    sort
    views
    summary
    text
    publish_at
    update_at
    create_at
    category {
      ...DocumentCategoryFields
    }
  }
`;

export const Q_GET_DOCUMENTS = gql`
  ${F_DOCUMENT_FIELDS}

  query queryDocument($queryString: String!) {
    queryDocument(queryString: $queryString) {
      total
      page
      pageCount
      data {
        ...DocumentFields
      }
    }
  }
`;

export const Q_GET_DOCUMENT = gql`
  ${F_DOCUMENT_FIELDS}
  ${F_DOCUMENT_CATEGORYRECURSIVE}

  query getDocument($id: String!, $queryString: String! = "") {
    document(id: $id, queryString: $queryString) {
      ...DocumentFields
    }

    documentCategoryTrees {
      ...DocumentCategoryRecursive
    }
  }
`;

export const M_UPDATE_DOCUMENT = gql`
  ${F_DOCUMENT_FIELDS}

  mutation updateDocument($id: String!, $data: DocumentInput!) {
    updateDocument(id: $id, data: $data) {
      ...DocumentFields
    }
  }
`;

export const M_CREATE_DOCUMENT = gql`
  ${F_DOCUMENT_FIELDS}

  mutation createDocument($data: DocumentInput!) {
    createDocument(data: $data) {
      ...DocumentFields
    }
  }
`;

export const M_DELETE_DOCUMENT = gql`
  mutation deleteDocument($ids: String!) {
    deleteDocument(ids: $ids)
  }
`;
