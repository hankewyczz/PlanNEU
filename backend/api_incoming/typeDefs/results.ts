import { gql } from "apollo-server";

const typeDef = gql`
    extend type Query {
        generateResults(
            courses: [String]!
            termId: String!
            filterStartTime: Int
            filterEndTime: Int
            filterDaysFree: [String]!
            filterMinNumDaysFree: Int
            filterMinSeatsLeft: Int
            filterMinHonors: Int): Results
    }
    type Results {
        results: [[String]]!
        sections: JSON
        courses: [Course]!
    }
`;

export default typeDef;
