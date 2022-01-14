import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../generated/graphql';

export const gqlClient = getSdk(new GraphQLClient(process.env.COURSE_CATALOG_URL || "https://api.searchneu.com"));