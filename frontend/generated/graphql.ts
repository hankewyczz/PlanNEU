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
  JSONObject: any;
};

export type Course = {
  __typename?: "Course";
  classId: Scalars["String"];
  coreqs?: Maybe<Scalars["JSON"]>;
  name: Scalars["String"];
  sections: Array<ParsedSection>;
  subject: Scalars["String"];
  termId: Scalars["String"];
};

export type ParsedSection = {
  __typename?: "ParsedSection";
  campus: Scalars["String"];
  classType: Scalars["String"];
  crn: Scalars["String"];
  honors: Scalars["Boolean"];
  lastUpdateTime?: Maybe<Scalars["Float"]>;
  meetings?: Maybe<Scalars["JSON"]>;
  profs: Array<Scalars["String"]>;
  seatsCapacity: Scalars["Int"];
  seatsRemaining: Scalars["Int"];
  url: Scalars["String"];
  waitCapacity: Scalars["Int"];
  waitRemaining: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  _empty?: Maybe<Scalars["String"]>;
  generateSchedule?: Maybe<Results>;
};

export type QueryGenerateScheduleArgs = {
  courses: Array<InputMaybe<Scalars["String"]>>;
  filterDaysFree: Array<InputMaybe<Scalars["String"]>>;
  filterEndTime?: InputMaybe<Scalars["String"]>;
  filterMinHonors?: InputMaybe<Scalars["String"]>;
  filterMinNumDaysFree?: InputMaybe<Scalars["String"]>;
  filterMinSeatsLeft?: InputMaybe<Scalars["String"]>;
  filterStartTime?: InputMaybe<Scalars["String"]>;
  termId: Scalars["String"];
};

export type Results = {
  __typename?: "Results";
  courses: Array<Maybe<Course>>;
  results: Array<Maybe<Array<Maybe<Scalars["String"]>>>>;
  sections?: Maybe<Scalars["JSON"]>;
  stats?: Maybe<Stats>;
};

export type Stats = {
  __typename?: "Stats";
  numCombinations: Scalars["Int"];
  time: Scalars["Int"];
};

export type GenerateScheduleQueryVariables = Exact<{
  courses: Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>;
  termId: Scalars["String"];
  filterDaysFree:
    | Array<InputMaybe<Scalars["String"]>>
    | InputMaybe<Scalars["String"]>;
  filterStartTime?: InputMaybe<Scalars["String"]>;
  filterEndTime?: InputMaybe<Scalars["String"]>;
  filterMinNumDaysFree?: InputMaybe<Scalars["String"]>;
  filterMinSeatsLeft?: InputMaybe<Scalars["String"]>;
  filterMinHonors?: InputMaybe<Scalars["String"]>;
}>;

export type GenerateScheduleQuery = {
  __typename?: "Query";
  generateSchedule?:
    | {
        __typename?: "Results";
        results: Array<Array<string | null | undefined> | null | undefined>;
        sections?: any | null | undefined;
        courses: Array<
          | {
              __typename?: "Course";
              name: string;
              subject: string;
              termId: string;
              classId: string;
              coreqs?: any | null | undefined;
            }
          | null
          | undefined
        >;
        stats?:
          | { __typename?: "Stats"; time: number; numCombinations: number }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export const GenerateScheduleDocument = gql`
  query generateSchedule(
    $courses: [String]!
    $termId: String!
    $filterDaysFree: [String]!
    $filterStartTime: String
    $filterEndTime: String
    $filterMinNumDaysFree: String
    $filterMinSeatsLeft: String
    $filterMinHonors: String
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
    ) {
      results
      sections
      courses {
        name
        subject
        termId
        classId
        coreqs
      }
      stats {
        time
        numCombinations
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
