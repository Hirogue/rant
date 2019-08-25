import gql from 'graphql-tag';

export const F_DOCUMENT_CATEGORY_FIELDS = gql`
  fragment DocumentCategoryFields on DocumentCategory {
    id
    title
    sort
  }
`;

export const F_DOCUMENT_CATEGORYRECURSIVE = gql`
  fragment DocumentCategoryRecursive on DocumentCategory {
    ...DocumentCategoryFields
    children {
      ...DocumentCategoryFields
      children {
        ...DocumentCategoryFields
        children {
          ...DocumentCategoryFields
          children {
            ...DocumentCategoryFields
            children {
              ...DocumentCategoryFields
              children {
                ...DocumentCategoryFields
                children {
                  ...DocumentCategoryFields
                  children {
                    ...DocumentCategoryFields
                    children {
                      ...DocumentCategoryFields
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const Q_GET_DOCUMENT_CATEGORY_TREES = gql`
  ${F_DOCUMENT_CATEGORY_FIELDS}
  ${F_DOCUMENT_CATEGORYRECURSIVE}

  query getDocumentCategoryTrees {
    documentCategoryTrees {
      ...DocumentCategoryRecursive
    }
  }
`;

export const Q_GET_DOCUMENT_CATEGORY = gql`
  ${F_DOCUMENT_CATEGORY_FIELDS}

  query getDocumentCategory($id: String!, $queryString: String! = "") {
    documentCategory(id: $id, queryString: $queryString) {
      ...DocumentCategoryFields
    }
  }
`;

export const M_UPDATE_DOCUMENT_CATEGORY = gql`
  ${F_DOCUMENT_CATEGORY_FIELDS}

  mutation updateDocumentCategoryInput($id: String!, $data: DocumentCategoryInput!) {
    updateDocumentCategory(id: $id, data: $data) {
      ...DocumentCategoryFields
    }
  }
`;

export const M_CREATE_DOCUMENT_CATEGORY = gql`
  ${F_DOCUMENT_CATEGORY_FIELDS}

  mutation createDocumentCategory($data: DocumentCategoryInput!) {
    createDocumentCategory(data: $data) {
      ...DocumentCategoryFields
    }
  }
`;

export const M_DELETE_DOCUMENT_CATEGORY = gql`
  mutation deleteDocumentCategory($ids: String!) {
    deleteDocumentCategory(ids: $ids)
  }
`;
