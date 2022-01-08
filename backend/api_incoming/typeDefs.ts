import { gql } from "apollo-server";

const typeDef = gql`
    extend type Query {
        generateSchedule(
            courses: [String]!
            termId: String!
            filterStartTime: String
            filterEndTime: String
            filterDaysFree: [String]!
            filterMinNumDaysFree: Int
            filterMinSeatsLeft: Int
            filterMinHonors: Int, 
            offset: [String!]): Results!
    }
    type Course {
        name: String!
        subject: String!
        classId: String!
        termId: String!
        coreqs: JSON!
    }

    type Section {
        classId: String!
        classType: String!
        crn: String!
        seatsCapacity: Int!
        seatsRemaining: Int!
        waitCapacity: Int!
        waitRemaining: Int!
        lastUpdateTime: Float!
        campus: String!
        honors: Boolean!
        url: String!
        profs: [String!]!
        meetings: JSON!
    }
    type Results {
        hasNextPage: Boolean!
        results: [[String!]!]!
        sections: [Section!]!
        courses: [Course!]!
        offset: [String!]
    }
`;

export default typeDef;
