import { GraphQLClient } from "graphql-request";
import {  getSdk } from "../../generated/graphql";

const ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export const gqlClient = getSdk(new GraphQLClient(ENDPOINT));