import keys from '../../config/keys';
import { IUser } from '../../types';
import { ITweet, TweetArgs } from '../../types/Tweet.types';
import Tweet, { TweetModel } from './Tweet';

export const createTweet = (tweetData: TweetArgs, userHandle: IUser['handle']): Promise<TweetModel> => {
  const text = tweetData.text;
  const regex = /#[a-zA-Z][a-zA-Z0-9]*/g;
  const hashtags: ITweet['hashtags'] = [];

  let match: RegExpExecArray;
  while ((match = regex.exec(text)) != null) {
    hashtags.push({ text: match[0].substring(1, match[0].length), indices: [match.index, match.index + match[0].length] });
  }

  const tweet = new Tweet({
    userHandle,
    text,
    hashtags
  });

  if (tweetData.fileName)
    tweet.imageURL = keys.firebaseStorageUrl + tweetData.fileName.replace('/', '%2F') + '?alt=media&token=' + keys.firebaseToken;

  return tweet.save();
};
