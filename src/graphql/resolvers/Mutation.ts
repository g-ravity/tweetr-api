import { login, signup } from '../../services/users/user.mutation';
import { addTweet } from './../../services/tweets/tweet.mutation';

const Mutation = {
  // User Mutations
  signup,
  login,

  // Tweet Mutations
  addTweet
};

export default Mutation;
