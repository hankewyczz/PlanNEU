import { GraphQLClient } from "graphql-request";
import {  getSdk } from "../../generated/graphql";

const ENDPOINT = process.env.BACKEND_API;

export const gqlClient = getSdk(new GraphQLClient(ENDPOINT));