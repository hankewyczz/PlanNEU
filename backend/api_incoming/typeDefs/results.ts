import { gql } from "apollo-server";

const typeDef = gql`
    extend type Query {
        generateSchedule(
            courses: [String]!
            termId: String!
            filterStartTime: String
            filterEndTime: String
            filterDaysFree: [String]!
            filterMinNumDaysFree: String
            filterMinSeatsLeft: String
            filterMinHonors: String): Results
    }
    type Course {
        name: String!
        subject: String!
        classId: String!
        termId: String!
        coreqs: JSON
        sections: [ParsedSection!]!
    }

    type ParsedSection {
        classType: String!
        crn: String!
        seatsCapacity: Int!
        seatsRemaining: Int!
        waitCapacity: Int!
        waitRemaining: Int!
        lastUpdateTime: Float
        campus: String!
        honors: Boolean!
        url: String!
        profs: [String!]!
        meetings: JSON
    }
    type Stats {
        time: Int!
        numCombinations: Int!
    }
    type Results {
        results: [[String]]!
        sections: JSON
        courses: [Course]!
        stats: Stats
    }
`;

export default typeDef;
