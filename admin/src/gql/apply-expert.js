import gql from 'graphql-tag';
import { F_METADATA_FIELDS, F_METADATA_RECURSIVE } from './metadata';
import { F_ORG_FIELDS, F_ORG_RECURSIVE } from './org';

export const F_APPLY_EXPERT_FIELDS = gql`
  fragment ApplyExpertFields on ApplyExpert {
    id
    reason
    status
    update_at
    create_at
    applicant {
      id
      realname
      phone
    }
    expert {
      id
      name
    }
    org {
      id
      title
    }
    own {
      id
      realname
    }
  }
`;

export const Q_GET_APPLY_EXPERTS = gql`
  ${F_APPLY_EXPERT_FIELDS}

  query queryApplyExpert($queryString: String!) {
    queryApplyExpert(queryString: $queryString) {
      total
      page
      pageCount
      data {
        ...ApplyExpertFields
      }
    }
  }
`;

export const Q_GET_APPLY_EXPERT = gql`
  ${F_APPLY_EXPERT_FIELDS}

  query getApplyExpert($id: String!, $queryString: String! = "") {
    applyExpert(id: $id, queryString: $queryString) {
      ...ApplyExpertFields
    }
  }
`;

export const M_UPDATE_APPLY_EXPERT = gql`
  ${F_APPLY_EXPERT_FIELDS}

  mutation updateApplyExpert($id: String!, $data: ApplyExpertInput!) {
    updateApplyExpert(id: $id, data: $data) {
      ...ApplyExpertFields
    }
  }
`;

export const M_CREATE_APPLY_EXPERT = gql`
  ${F_APPLY_EXPERT_FIELDS}

  mutation createApplyExpert($data: ApplyExpertInput!) {
    createApplyExpert(data: $data) {
      ...ApplyExpertFields
    }
  }
`;

export const M_DELETE_APPLY_EXPERT = gql`
  mutation deleteApplyExpert($ids: String!) {
    deleteApplyExpert(ids: $ids)
  }
`;
