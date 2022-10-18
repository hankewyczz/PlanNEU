import { ApolloServer, gql } from "apollo-server";
import resolvers from "./resolvers";
import resultTypeDef from "./typeDefs";
import process from "process";

const baseQuery = gql`
    scalar JSON

    type Query {
        _empty: String
    }
`;

const server = new ApolloServer({
    typeDefs: [baseQuery, resultTypeDef],
    resolvers,
});

server.listen(80).then(({ url }) => {
    console.log(`GraphQL API ready at ${url}`);
});

export default server;
