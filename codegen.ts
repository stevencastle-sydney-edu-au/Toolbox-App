import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './graphql/schema.ts',
  documents: ['./graphql/**/*.ts'],
  generates: {
    './graphql/types.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
      },
    },
  },
};

export default config;