import gql from 'graphql-tag';
import { F_ROLE_FIELDS } from './role';
import { F_ORG_FIELDS } from './org';

export const Q_FETCH_CURRENT_USER = gql`
  ${F_ROLE_FIELDS}
  ${F_ORG_FIELDS}

  query fetchCurrentUser {
    me {
      id
      account
      avatar
      realname
      profile
      address
      isSuperAdmin
      role {
        ...RoleFields
      }
      org {
        ...OrgFields
      }
    }
  }
`;
