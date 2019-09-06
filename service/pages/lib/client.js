import { HttpLink } from "apollo-boost";
import { from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import apolloLogger from 'apollo-link-logger';
import { withData } from "next-apollo";
import { message } from "antd";

const dev = process.env.NODE_ENV !== 'production';
const token = typeof window === 'undefined' ? '' : localStorage.getItem('u_token');

const httpLink = new HttpLink({
    uri: "/graphql", // Server URL (must be absolute)
    opts: {
        credentials: "same-origin" // Additional fetch() options like `credentials` or `headers`
    },
    headers: {
        apollo: true,
        application: 'frontstage',
        authorization: `Bearer ${token}`
    }
})

const errorHandler = onError(error => {
    console.error('error:', error);

    const { graphQLErrors } = error;

    if (graphQLErrors && graphQLErrors.length > 0) {
        const result = graphQLErrors.shift();
        const errorMsg = result.message;

        message.error(errorMsg);
    }

    return false;
});

let middlewares = [errorHandler, httpLink];

if (dev) {
    middlewares = [apolloLogger, ...middlewares];
}

const config = {
    link: from(middlewares),
};

const withClient = withData(config);

export { withClient };
export default withClient;