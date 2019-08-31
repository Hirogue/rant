import { gql } from 'apollo-boost';
import { 
    F_METADATA_FIELDS, 
    F_METADATA_RECURSIVE, 
    F_PROVIDER_FIELDS, 
    F_PROVIDER_CATEGORYRECURSIVE, 
    F_PRODUCT_FIELDS, 
    F_PRODUCT_CATEGORYRECURSIVE
} from '../gql';


export const Q_GET_HOME_DATA = gql`
    ${F_METADATA_FIELDS}
    ${F_METADATA_RECURSIVE}

    ${F_PROVIDER_FIELDS}
    ${F_PROVIDER_CATEGORYRECURSIVE}

    ${F_PRODUCT_FIELDS}
    ${F_PRODUCT_CATEGORYRECURSIVE}

    query getMetadataTrees(
        $commonQuery: String! = "", 
        $providerQuery: String! = "", 
        $productQuery: String! = "", 
        $providerRoot: String! = "行业"
    ) {

        querySuccessCase(queryString: $commonQuery) {
            total
            data {
                id
                title
                cover
                create_at
                sort
                summary
            }
        }

        queryCarousel(queryString: $commonQuery) {
            total
            data {
                id
                url
                link
                create_at
                sort
            }
        }

        queryExpert(queryString: $commonQuery) {
            total
            data {
                id
                name
                avatar
                category
                company
                position
                info
                sort
            }
        }

        queryProvider(queryString: $providerQuery) {
            total
            data {
                ...ProviderFields
            }
        }

        providerCategoryTrees {
            ...ProviderCategoryRecursive
        }

        queryProduct(queryString: $productQuery) {
            total
            data {
                ...ProductFields
            }
        }

        productCategoryTrees {
            ...ProductCategoryRecursive
        }

        metadataDescendantsTree(root: $providerRoot) {
            ...MetadataRecursive
        }

    }
    
`


export const Q_GET_HOME_ARTICLES = gql`
    fragment ArticleFields on Article {
        id
        title
        author
        source
        cover
        is_top
        sort
        summary
        publish_at
        update_at
        create_at
        category {
            id
            title
        }
    }

    query queryArticle($queryString: String!) {
        queryArticle(queryString: $queryString) {
            total
            page
            pageCount
            data {
                ...ArticleFields
            }
        }
    }
`;