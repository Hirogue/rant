import { gql } from 'apollo-boost';

export const Q_GET_DOCUMENT = gql`
    query document($id: String!, $queryString: String! = "") {
        document(id: $id, queryString: $queryString) {
            id
            title
            publish_at
            views
            summary
            text
            category {
                id
                title
            }
        }
    }

`
