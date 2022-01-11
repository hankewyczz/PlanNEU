import { GraphQLClient } from "graphql-request";
import * as Dom from "graphql-request/dist/types.dom";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type Course = {
  __typename?: "Course";
  classId: Scalars["String"];
  coreqs: Scalars["JSON"];
  name: Scalars["String"];
  subject: Scalars["String"];
  termId: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  _empty?: Maybe<Scalars["String"]>;
  generateSchedule: Results;
};

export type QueryGenerateScheduleArgs = {
  courses: Array<InputMaybe<Scalars["String"]>>;
  filterDaysFree: Array<InputMaybe<Scalars["String"]>>;
  filterEndTime?: InputMaybe<Scalars["String"]>;
  filterMinHonors?: InputMaybe<Scalars["Int"]>;
  filterMinNumDaysFree?: InputMaybe<Scalars["Int"]>;
  filterMinSeatsLeft?: InputMaybe<Scalars["Int"]>;
  filterStartTime?: InputMaybe<Scalars["String"]>;
  offset?: InputMaybe<Array<Scalars["String"]>>;
  termId: Scalars["String"];
};

export type Results = {
  __typename?: "Results";
  courses: Array<Course>;
  offset?: Maybe<Array<Scalars["String"]>>;
  results: Array<Array<Scalars["String"]>>;
  sections: Array<Section>;
};

export type Section = {
  __typename?: "Section";
  campus: Scalars["String"];
  class: Scalars["String"];
  classId: Scalars["String"];
  classType: Scalars["String"];
  crn: Scalars["String"];
  honors: Scalars["Boolean"];
  lastUpdateTime: Scalars["Float"];
  meetings: Scalars["JSON"];
  profs: Array<Scalars["String"]>;
  seatsCapacity: Scalars["Int"];
  seatsRemaining: Scalars["Int"];
  subject: Scalars["String"];
  timestamp_meetings: Scalars["JSON"];
  url: Scalars["String"];
  waitCapacity: Scalars["Int"];
  waitRemaining: Scalars["Int"];
};

export type GenerateScheduleQueryVariables = Exact<{
  courses: Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>;
  termId: Scalars["String"];
  filterDaysFree:
    | Array<InputMaybe<Scalars["String"]>>
    | InputMaybe<Scalars["String"]>;
  filterStartTime?: InputMaybe<Scalars["String"]>;
  filterEndTime?: InputMaybe<Scalars["String"]>;
  filterMinNumDaysFree?: InputMaybe<Scalars["Int"]>;
  filterMinSeatsLeft?: InputMaybe<Scalars["Int"]>;
  filterMinHonors?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Array<Scalars["String"]> | Scalars["String"]>;
}>;

export type GenerateScheduleQuery = {
  __typename?: "Query";
  generateSchedule: {
    __typename?: "Results";
    offset?: Array<string> | null | undefined;
    results: Array<Array<string>>;
    sections: Array<{
      __typename?: "Section";
      class: string;
      subject: string;
      classId: string;
      classType: string;
      crn: string;
      seatsCapacity: number;
      seatsRemaining: number;
      waitCapacity: number;
      waitRemaining: number;
      lastUpdateTime: number;
      campus: string;
      honors: boolean;
      url: string;
      profs: Array<string>;
      meetings: any;
      timestamp_meetings: any;
    }>;
    courses: Array<{
      __typename?: "Course";
      name: string;
      subject: string;
      termId: string;
      classId: string;
      coreqs: any;
    }>;
  };
};

export const GenerateScheduleDocument = gql`
  query generateSchedule(
    $courses: [String]!
    $termId: String!
    $filterDaysFree: [String]!
    $filterStartTime: String
    $filterEndTime: String
    $filterMinNumDaysFree: Int
    $filterMinSeatsLeft: Int
    $filterMinHonors: Int
    $offset: [String!]
  ) {
    generateSchedule(
      courses: $courses
      termId: $termId
      filterStartTime: $filterStartTime
      filterEndTime: $filterEndTime
      filterDaysFree: $filterDaysFree
      filterMinNumDaysFree: $filterMinNumDaysFree
      filterMinSeatsLeft: $filterMinSeatsLeft
      filterMinHonors: $filterMinHonors
      offset: $offset
    ) {
      offset
      results
      sections {
        class
        subject
        classId
        classType
        crn
        seatsCapacity
        seatsRemaining
        waitCapacity
        waitRemaining
        lastUpdateTime
        campus
        honors
        url
        profs
        meetings
        timestamp_meetings
      }
      courses {
        name
        subject
        termId
        classId
        coreqs
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    generateSchedule(
      variables: GenerateScheduleQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GenerateScheduleQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GenerateScheduleQuery>(
            GenerateScheduleDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "generateSchedule"
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
