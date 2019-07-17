import { withData } from "next-apollo";
import { HttpLink } from "apollo-boost";

const dev = process.env.NODE_ENV !== 'production';

const config = {
  link: new HttpLink({
    uri: dev ? "http://127.0.0.1:3000/graphql" : "http://todo.graphql.nestify.cn/graphql", // Server URL (must be absolute)
    opts: {
      credentials: "same-origin" // Additional fetch() options like `credentials` or `headers`
    }
  })
};

export default withData(config);
