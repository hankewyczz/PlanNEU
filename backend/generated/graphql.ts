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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Private = "PRIVATE",
  Public = "PUBLIC",
}

export type Class = {
  __typename?: "Class";
  allOccurrences: Array<Maybe<ClassOccurrence>>;
  classId: Scalars["String"];
  latestOccurrence?: Maybe<ClassOccurrence>;
  name: Scalars["String"];
  occurrence?: Maybe<ClassOccurrence>;
  subject: Scalars["String"];
};

export type ClassOccurrenceArgs = {
  termId: Scalars["String"];
};

export type ClassOccurrence = {
  __typename?: "ClassOccurrence";
  classAttributes: Array<Scalars["String"]>;
  classId: Scalars["String"];
  coreqs?: Maybe<Scalars["JSON"]>;
  desc: Scalars["String"];
  feeAmount?: Maybe<Scalars["Int"]>;
  feeDescription?: Maybe<Scalars["String"]>;
  host: Scalars["String"];
  lastUpdateTime?: Maybe<Scalars["Float"]>;
  maxCredits?: Maybe<Scalars["Int"]>;
  minCredits?: Maybe<Scalars["Int"]>;
  name: Scalars["String"];
  nupath: Array<Scalars["String"]>;
  optPrereqsFor?: Maybe<Scalars["JSON"]>;
  prereqs?: Maybe<Scalars["JSON"]>;
  prereqsFor?: Maybe<Scalars["JSON"]>;
  prettyUrl?: Maybe<Scalars["String"]>;
  sections: Array<Section>;
  subject: Scalars["String"];
  termId: Scalars["String"];
  url: Scalars["String"];
};

export type Employee = {
  __typename?: "Employee";
  bigPictureUrl?: Maybe<Scalars["String"]>;
  emails: Array<Scalars["String"]>;
  firstName: Scalars["String"];
  googleScholarId?: Maybe<Scalars["String"]>;
  lastName: Scalars["String"];
  link?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  officeRoom?: Maybe<Scalars["String"]>;
  personalSite?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  pic?: Maybe<Scalars["String"]>;
  primaryDepartment?: Maybe<Scalars["String"]>;
  primaryRole?: Maybe<Scalars["String"]>;
  streetAddress?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export type FilterAgg = {
  __typename?: "FilterAgg";
  count: Scalars["Int"];
  description?: Maybe<Scalars["String"]>;
  value: Scalars["String"];
};

export type FilterOptions = {
  __typename?: "FilterOptions";
  campus?: Maybe<Array<FilterAgg>>;
  classType?: Maybe<Array<FilterAgg>>;
  nupath?: Maybe<Array<FilterAgg>>;
  subject?: Maybe<Array<FilterAgg>>;
};

export type IntRange = {
  max: Scalars["Int"];
  min: Scalars["Int"];
};

export type Major = {
  __typename?: "Major";
  latestOccurrence?: Maybe<MajorOccurrence>;
  majorId: Scalars["String"];
  occurrence?: Maybe<MajorOccurrence>;
  yearVersion: Scalars["String"];
};

export type MajorOccurrenceArgs = {
  year: Scalars["Int"];
};

export type MajorOccurrence = {
  __typename?: "MajorOccurrence";
  majorId: Scalars["String"];
  plansOfStudy: Scalars["JSON"];
  spec: Scalars["JSON"];
  yearVersion: Scalars["String"];
};

export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: Scalars["Boolean"];
};

export type Query = {
  __typename?: "Query";
  _empty?: Maybe<Scalars["String"]>;
  class?: Maybe<Class>;
  classByHash?: Maybe<ClassOccurrence>;
  major?: Maybe<Major>;
  search?: Maybe<SearchResultItemConnection>;
  sectionByHash?: Maybe<Section>;
  termInfos: Array<TermInfo>;
};

export type QueryClassArgs = {
  classId: Scalars["String"];
  subject: Scalars["String"];
};

export type QueryClassByHashArgs = {
  hash: Scalars["String"];
};

export type QueryMajorArgs = {
  majorId: Scalars["String"];
};

export type QuerySearchArgs = {
  campus?: InputMaybe<Array<Scalars["String"]>>;
  classIdRange?: InputMaybe<IntRange>;
  classType?: InputMaybe<Array<Scalars["String"]>>;
  first?: InputMaybe<Scalars["Int"]>;
  nupath?: InputMaybe<Array<Scalars["String"]>>;
  offset?: InputMaybe<Scalars["Int"]>;
  query?: InputMaybe<Scalars["String"]>;
  subject?: InputMaybe<Array<Scalars["String"]>>;
  termId: Scalars["String"];
};

export type QuerySectionByHashArgs = {
  hash: Scalars["String"];
};

export type QueryTermInfosArgs = {
  subCollege: Scalars["String"];
};

export type SearchResultItem = ClassOccurrence | Employee;

export type SearchResultItemConnection = {
  __typename?: "SearchResultItemConnection";
  filterOptions: FilterOptions;
  nodes?: Maybe<Array<Maybe<SearchResultItem>>>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"];
};

export type Section = {
  __typename?: "Section";
  campus: Scalars["String"];
  classId: Scalars["String"];
  classType: Scalars["String"];
  crn: Scalars["String"];
  honors: Scalars["Boolean"];
  host: Scalars["String"];
  lastUpdateTime?: Maybe<Scalars["Float"]>;
  meetings?: Maybe<Scalars["JSON"]>;
  profs: Array<Scalars["String"]>;
  seatsCapacity: Scalars["Int"];
  seatsRemaining: Scalars["Int"];
  subject: Scalars["String"];
  termId: Scalars["String"];
  url: Scalars["String"];
  waitCapacity: Scalars["Int"];
  waitRemaining: Scalars["Int"];
};

export type TermInfo = {
  __typename?: "TermInfo";
  subCollege: Scalars["String"];
  termId: Scalars["String"];
  text: Scalars["String"];
};

export type GetCourseQueryVariables = Exact<{
  subject: Scalars["String"];
  classId: Scalars["String"];
  termId: Scalars["String"];
}>;

export type GetCourseQuery = {
  __typename?: "Query";
  class?:
    | {
        __typename?: "Class";
        occurrence?:
          | {
              __typename?: "ClassOccurrence";
              termId: string;
              subject: string;
              classId: string;
              name: string;
              coreqs?: any | null | undefined;
              desc: string;
              sections: Array<{
                __typename?: "Section";
                classType: string;
                crn: string;
                seatsCapacity: number;
                seatsRemaining: number;
                waitCapacity: number;
                waitRemaining: number;
                lastUpdateTime?: number | null | undefined;
                campus: string;
                honors: boolean;
                url: string;
                profs: Array<string>;
                meetings?: any | null | undefined;
              }>;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export const GetCourseDocument = gql`
  query getCourse($subject: String!, $classId: String!, $termId: String!) {
    class(subject: $subject, classId: $classId) {
      occurrence(termId: $termId) {
        termId
        subject
        classId
        name
        coreqs
        desc
        sections {
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
        }
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
    getCourse(
      variables: GetCourseQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetCourseQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetCourseQuery>(GetCourseDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getCourse"
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
