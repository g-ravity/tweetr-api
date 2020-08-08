import { shield } from 'graphql-shield';
import { isAuthenticated } from './rules';

const permissions = shield({
  Query: {
    // User Queries
    me: isAuthenticated
  },
  Mutation: {
    // Tweet Mutations
    addTweet: isAuthenticated
  }
});

export default permissions;
