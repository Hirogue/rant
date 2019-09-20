import { gql } from 'apollo-boost';
import { F_ARTICLE_FIELDS, F_ARTICLE_CATEGORYRECURSIVE } from '../gql';


export const Q_GET_ARTICLE_DATA = gql`

    ${F_ARTICLE_FIELDS}
    ${F_ARTICLE_CATEGORYRECURSIVE}

    query queryArticle(
            $latestNewsString: String!, 
            $newsString1: String!,
            $newsString2: String!,
            $newsString3: String!,
            $newsString4: String!,
            $newsString5: String!,
        ) {
        latestNews: queryArticle(queryString: $latestNewsString) {
            total
            page
            pageCount
            data {
                ...ArticleFields
            }
        }

        news1: queryArticle(queryString: $newsString1) {
            total
            page
            pageCount
            data {
                ...ArticleFields
            }
        }
        news2: queryArticle(queryString: $newsString2) {
            total
            page
            pageCount
            data {
                ...ArticleFields
            }
        }
        news3: queryArticle(queryString: $newsString3) {
            total
            page
            pageCount
            data {
                ...ArticleFields
            }
        }
        news4: queryArticle(queryString: $newsString4) {
            total
            page
            pageCount
            data {
                ...ArticleFields
            }
        }
        news5: queryArticle(queryString: $newsString5) {
            total
            page
            pageCount
            data {
                ...ArticleFields
            }
        }

        articleCategoryTrees {
            ...ArticleCategoryRecursive
        }
    }
`

export const Q_GET_ARTICLE_DETAIL = gql`
    ${F_ARTICLE_FIELDS}

    query getArticle($id: String!) {
        article(id: $id) {
            ...ArticleFields
        }
    }

`

export const Q_GET_NEIGHBORING_ARTICLE_NEST = gql`
    query getArticle($queryPrevString: String!, $queryNextString: String!) {
        prev: queryArticle(queryString: $queryPrevString) {
            data {
                id
                title
            }
        }
        next: queryArticle(queryString: $queryNextString) {
            data {
                id
                title
            }
        }
    }

`