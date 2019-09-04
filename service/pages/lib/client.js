import { HttpLink } from "apollo-boost";
import { withData } from "next-apollo";

const token = typeof window === 'undefined' ? '' : localStorage.getItem('u_token');

const config = {
    link: new HttpLink({
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
};

const withClient = withData(config);

export { withClient };
export default withClient;