import { ApolloServer, gql } from "apollo-server";
import resolvers from "./resolvers/class";
import resultTypeDef from "./typeDefs/results";

const baseQuery = gql`
    scalar JSON
    scalar JSONObject

    type Query {
        _empty: String
    }
`;

const server = new ApolloServer({
    typeDefs: [baseQuery, resultTypeDef],
    resolvers,
});
server.listen(4001).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

export default server;
