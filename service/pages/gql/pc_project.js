import { gql } from 'apollo-boost';
import { F_PROJECT_FIELDS } from '../gql';


export const Q_GET_PROJECT_DATA = gql`

    query getProjectData($queryString: String!) {
        findRootsAndChildren {
            id
            title
            children {
                id
                title
            }
        }

        queryProject(queryString: $queryString) {
            total
            count
            page
            pageCount
            data {
                id
                title
                cover
                contact
                area_path
                phone
                hideCompany
                views
                category
                status
                update_at
                create_at
                publish_at
                amount
                progress
                team_info
                advantage
                purposes
                payment
                summary
                hideName
                hideCompany
                stage {
                    id
                    title
                }
                exit_mode {
                    id
                    title
                }
                withdrawal_year {
                    id
                    title
                }
                ratio {
                    id
                    title
                }
                data {
                    id
                    title
                }
                risk {
                    id
                    title
                }
                interest {
                    id
                    title
                }
                occupancy_time {
                    id
                    title
                }
                industry {
                    id
                    title
                }
                creator {
                    id
                    avatar
                }
            }
        }
    }
`

export const Q_GET_PROJECT_DETAIL = gql`
  ${F_PROJECT_FIELDS}

    query getProject($id: String!, $queryString: String! = "", $queryMore: String! = "") {
        project(id: $id, queryString: $queryString) {
            area_path
            ...ProjectFields
        }

        queryProject(queryString: $queryMore) {
            total
            count
            page
            pageCount
            data {
                id
                title
                cover
                category
                industry {
                    id
                    title
                }
            }
        }
    }

`