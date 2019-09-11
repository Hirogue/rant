import { gql } from 'apollo-boost';
import { F_CAPITAL_FIELDS } from '../gql';


export const Q_GET_CAPITAL_DATA = gql`

    query getProjectData($queryCapital: String!, $queryProduct: String!) {
        findRootsAndChildren {
            id
            title
            children {
                id
                title
            }
        }

        queryCapital(queryString: $queryCapital) {
            total
            count
            page
            pageCount
            data {
                id
                amount
                title
                contact
                phone
                company
                views
                category
                status
                update_at
                create_at
                publish_at
                info
                return
                pledge
                discount
                pre_payment
                term
                area_path
                hideContact
                hideCompany
                hidePhone
                type {
                    id
                    title
                }
                industry {
                    id
                    title
                }
                stage {
                    id
                    title
                }
                creator {
                    id
                    avatar
                    hideName
                    hideCompany
                }
                area {
                    id
                    title
                }
                equity_type {
                    id
                    title
                }
                invest_type {
                    id
                    title
                }
                invest_area {
                    id
                    title
                }
                risk {
                    id
                    title
                }
                data {
                    id
                    title
                }
                ratio {
                    id
                    title
                }
            }
        }

        queryProduct(queryString: $queryProduct) {
            total
            count
            page
            pageCount
            data {
                id
                name
                cover
                summary
            }
        }
    }
`

export const Q_GET_CAPITAL_DETAIL = gql`
  ${F_CAPITAL_FIELDS}

    query getProject($id: String!, $queryString: String! = "", $queryMore: String! = "") {
        capital(id: $id, queryString: $queryString) {
            area_path
            ...CapitalFields
        }

        queryCapital(queryString: $queryMore) {
            total
            count
            page
            pageCount
            data {
                id
                title
                category
                industry {
                    id
                    title
                }
            }
        }
    }

`