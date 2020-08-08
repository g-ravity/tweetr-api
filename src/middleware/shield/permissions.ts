import { shield } from 'graphql-shield';
import { isAuthenticated } from './rules';

const permissions = shield({
  Query: {
    // User Queries
    me: isAuthenticated
  }
});

export default permissions;
