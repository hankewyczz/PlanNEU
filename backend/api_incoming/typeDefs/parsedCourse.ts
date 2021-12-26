import { gql } from "apollo-server";

const typeDef = gql`
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
  }`

export default typeDef;
