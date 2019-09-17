import {
  F_APPLY_EXPERT_FIELDS,
  F_APPLY_PRODUCT_FIELDS,
  F_CAPITAL_FIELDS,
  F_PROJECT_FIELDS,
  F_USER_FIELDS,
} from '@/gql';
import gql from 'graphql-tag';

export const Q_GET_WORKPLACE_DATA = gql`
  ${F_USER_FIELDS}
  ${F_PROJECT_FIELDS}
  ${F_CAPITAL_FIELDS}
  ${F_APPLY_PRODUCT_FIELDS}
  ${F_APPLY_EXPERT_FIELDS}

  query(
    $userQS: String!
    $projectQS: String!
    $capitalQS: String!
    $productQS: String!
    $expertQS: String!
  ) {
    user: queryUser(queryString: $userQS) {
      total
      data {
        ...UserFields
      }
    }
    project: queryProject(queryString: $projectQS) {
      total
      data {
        ...ProjectFields
      }
    }
    capital: queryCapital(queryString: $capitalQS) {
      total
      data {
        ...CapitalFields
      }
    }
    product: queryApplyProduct(queryString: $productQS) {
      total
      data {
        ...ApplyProductFields
      }
    }
    expert: queryApplyExpert(queryString: $expertQS) {
      total
      data {
        ...ApplyExpertFields
      }
    }
  }
`;
