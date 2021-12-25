import { gql } from "apollo-server";

const typeDef = gql`
    extend type Query {
        generateResults(subject: String!, classId: String!): Results
    }
    type Results {
        results: [String]!;
        sections: JSON;
        courses: [ParsedCourse]!;
    }
`;

export default typeDef;
