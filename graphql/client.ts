import { ApolloClient, InMemoryCache } from '@apollo/client';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { SchemaLink } from '@apollo/client/link/schema';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const client = new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          me: {
            read(existing) {
              // If the me object exists but doesn't have stats, return undefined
              // to trigger a network request for the complete object
              if (existing && !existing.stats) {
                return undefined;
              }
              return existing;
            }
          }
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});