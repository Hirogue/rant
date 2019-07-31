import gql from 'graphql-tag';

export const F_ORG_FIELDS = gql`
  fragment OrgFields on Org {
    id
    title
    sort
  }
`;

export const F_ORG_RECURSIVE = gql`
  fragment OrgRecursive on Org {
    ...OrgFields
    children {
      ...OrgFields
      children {
        ...OrgFields
        children {
          ...OrgFields
          children {
            ...OrgFields
            children {
              ...OrgFields
              children {
                ...OrgFields
                children {
                  ...OrgFields
                  children {
                    ...OrgFields
                    children {
                      ...OrgFields
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

export const F_USER_FIELDS = gql`
  ${F_ORG_FIELDS}

  fragment UserFields on User {
    id
    create_at
    update_at
    account
    avatar
    realname
    phone
    idcard
    address
    company
    profile
    identity
    status
    org {
      ...OrgFields
    }
  }
`;
