import gql from 'graphql-tag';

export const F_AMOUNT_FIELDS = gql`
  fragment AmountFields on Amount {
    id
    title
    sort
  }
`;

export const F_AMOUNT_RECURSIVE = gql`
  fragment AmountRecursive on Amount {
    ...AmountFields
    children {
      ...AmountFields
      children {
        ...AmountFields
        children {
          ...AmountFields
          children {
            ...AmountFields
            children {
              ...AmountFields
              children {
                ...AmountFields
                children {
                  ...AmountFields
                  children {
                    ...AmountFields
                    children {
                      ...AmountFields
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

export const Q_GET_AMOUNT_TREES = gql`
  ${F_AMOUNT_FIELDS}
  ${F_AMOUNT_RECURSIVE}

  query getAmountTrees {
    amountTrees {
      ...AmountRecursive
    }
  }
`;

export const Q_GET_AMOUNT = gql`
  ${F_AMOUNT_FIELDS}

  query getAmount($id: String!, $queryString: String! = "") {
    amount(id: $id, queryString: $queryString) {
      ...AmountFields
    }
  }
`;

export const M_UPDATE_AMOUNT = gql`
  ${F_AMOUNT_FIELDS}

  mutation updateAmount($id: String!, $data: AmountInput!) {
    updateAmount(id: $id, data: $data) {
      ...AmountFields
    }
  }
`;

export const M_CREATE_AMOUNT = gql`
  ${F_AMOUNT_FIELDS}

  mutation createAmount($data: AmountInput!) {
    createAmount(data: $data) {
      ...AmountFields
    }
  }
`;

export const M_DELETE_AMOUNT = gql`
  mutation deleteAmount($ids: String!) {
    deleteAmount(ids: $ids)
  }
`;
