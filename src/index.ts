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
  context: (ctx): any => ({ ...ctx, userHandle: getUserHandle(ctx) })
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
    console.log('Conncted to MongoDB');
    server.applyMiddleware({ app, path: server.graphqlPath });
    app.listen({ port: 4000 }, () => console.log(`Server ready at http://localhost:4000${server.graphqlPath}`));
  })
  .catch(() => console.log('Error while connecting to MongoDB'));
