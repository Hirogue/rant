import { gql } from 'apollo-boost';
import { F_PROVIDER_FIELDS, F_PROVIDER_CATEGORYRECURSIVE } from '../gql';


export const Q_GET_PROVIDER_DATA = gql`
    ${F_PROVIDER_FIELDS}
    ${F_PROVIDER_CATEGORYRECURSIVE}

    query getProviderData($queryProvider: String!) {
        findRootsAndChildren {
            id
            title
            children {
                id
                title
            }
        }

        queryProvider(queryString: $queryProvider) {
            total
            count
            page
            pageCount
            data {
                area_path
                summary
                ...ProviderFields
            }
        }

        providerCategoryTrees {
            ...ProviderCategoryRecursive
        }
    }
`

export const Q_GET_PROVIDER_DETAIL = gql`
    ${F_PROVIDER_FIELDS}

    query getProvider($id: String!, $queryString: String! = "") {
        provider(id: $id, queryString: $queryString) {
            area_path
            ...ProviderFields
        }

    }

`