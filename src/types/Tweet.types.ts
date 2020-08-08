import { TweetModel } from '../services/tweets/Tweet';
import { IUser } from './User.types';

export interface TweetArgs {
  text?: TweetModel['text'];
  imageURL?: TweetModel['imageURL'];
}

export interface ITweet {
  userHandle: IUser['handle'];
  text: TweetModel['text'];
  hashtags: TweetModel['hashtags'];
  imageURL?: TweetModel['imageURL'];
}
