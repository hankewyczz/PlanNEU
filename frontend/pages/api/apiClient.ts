import { GraphQLClient } from "graphql-request";
import {  getSdk } from "../../generated/graphql";


export const gqlClient = getSdk(new GraphQLClient("http://localhost:4001"));