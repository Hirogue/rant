import gql from 'graphql-tag';

export const M_APPROVAL_PROJECT = gql`
  mutation approvalProject($data: ProjectInput!) {
    approvalProject(data: $data)
  }
`;

export const F_METADATA_ITEM_FIELDS = gql`
  fragment MetadataItemFields on Metadata {
    id
    title
  }
`;

export const Q_GET_PROJECT_METADATA = gql`
  ${F_METADATA_ITEM_FIELDS}

  query getProjectMetadata {
    industry: findMetadataChildrenByTitle(title: "行业") {
      ...MetadataItemFields
    }

    stage: findMetadataChildrenByTitle(title: "阶段") {
      ...MetadataItemFields
    }

    withdrawal_year: findMetadataChildrenByTitle(title: "年限") {
      ...MetadataItemFields
    }

    ratio: findMetadataChildrenByTitle(title: "比例") {
      ...MetadataItemFields
    }

    risk: findMetadataChildrenByTitle(title: "风控") {
      ...MetadataItemFields
    }

    interest: findMetadataChildrenByTitle(title: "利息") {
      ...MetadataItemFields
    }

    occupancy_time: findMetadataChildrenByTitle(title: "时长") {
      ...MetadataItemFields
    }

    exit_mode: findMetadataChildrenByTitle(title: "退出方式") {
      ...MetadataItemFields
    }

    data: findMetadataChildrenByTitle(title: "可提供资料") {
      ...MetadataItemFields
    }
  }
`;
