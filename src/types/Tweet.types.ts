import { TweetModel } from '../services/tweets/Tweet';
import { IUser } from './User.types';

interface File {
  createReadStream: () => NodeJS.ReadWriteStream;
  filename: string;
  encoding: string;
  mimetype: string;
}

export interface TweetInput {
  text?: TweetModel['text'];
  imageFile?: Promise<File>;
}

export interface TweetArgs {
  text?: TweetModel['text'];
  fileName?: string;
}

export interface ITweet {
  userHandle: IUser['handle'];
  text: TweetModel['text'];
  hashtags: TweetModel['hashtags'];
  imageURL?: TweetModel['imageURL'];
}
