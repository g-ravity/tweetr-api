import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import express from 'express';
import { applyMiddleware } from 'graphql-middleware';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import mongoose from 'mongoose';
import path from 'path';
import keys from './config/keys';
import resolvers from './graphql/resolvers';
import getUserHandle from './middleware/authMiddleware';
import permissions from './middleware/shield/permissions';

const app = express();

const schemaArray = fileLoader(path.join(__dirname, './graphql/schema/'));
const typeDefs = mergeTypes(schemaArray);

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers
  }),
  permissions
);

const server = new ApolloServer({
  schema,
  context: (ctx): any => ({ ...ctx, handle: getUserHandle(ctx) })
});

const dbConnectionString =
  process.env.NODE_ENV === 'production'
    ? `mongodb+srv://${keys.dbUser}:${keys.dbPassword}@ravikcluster-aiykj.mongodb.net/tweetr?retryWrites=true&w=majority`
    : 'mongodb://localhost/tweetr_db';

mongoose.set('useFindAndModify', false);
mongoose
  .connect(dbConnectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
    server.applyMiddleware({ app, path: server.graphqlPath });
    app.listen({ port: keys.port }, () => console.log(`Server ready at ${keys.port}`));
  })
  .catch(() => console.log('Error while connecting to MongoDB'));
