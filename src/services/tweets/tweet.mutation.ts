import { UserHandle } from '../../types';
import { ITweet, TweetArgs } from '../../types/Tweet.types';
import { createTweet } from './tweet.repository';

export const addTweet = async (_: any, args: { data: TweetArgs }, ctx: UserHandle): Promise<ITweet> => {
  try {
    const tweetData = args.data;
    if (tweetData.text || tweetData.imageURL) {
      if (tweetData.text.length > 150) throw new Error('Maximum 150 characters allowed');
      const tweet = await createTweet(tweetData, ctx.handle);

      return {
        userHandle: ctx.handle,
        text: tweet.text,
        hashtags: tweet.hashtags,
        imageURL: tweet.imageURL
      };
    }
    throw new Error('Tweet cannot be empty');
  } catch (err) {
    return err;
  }
};
