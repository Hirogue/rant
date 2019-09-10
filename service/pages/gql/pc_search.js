import { gql } from 'apollo-boost';
import { F_PROJECT_FIELDS, F_CAPITAL_FIELDS, F_PRODUCT_FIELDS } from '../gql';

export const Q_SEARCH_PROJECT = gql`
    ${F_PROJECT_FIELDS}

    query searchProject($queryString: String!) {
        result: searchProject(queryString: $queryString) {
            page
            pageCount
            total
            data {
                ...ProjectFields
            }
        }
    }

`

export const Q_SEARCH_CAPITAL = gql`
    ${F_CAPITAL_FIELDS}

    query searchCapital($queryString: String!) {
        result: searchCapital(queryString: $queryString) {
            page
            pageCount
            total
            data {
                ...CapitalFields
            }
        }
    }

`

export const Q_SEARCH_PRODUCT = gql`
    ${F_PRODUCT_FIELDS}

    query searchProduct($queryString: String!) {
        result: searchProduct(queryString: $queryString) {
            page
            pageCount
            total
            data {
                ...ProductFields
            }
        }
    }

`