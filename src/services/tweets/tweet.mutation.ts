import fbStorage from '../../config/firebase';
import keys from '../../config/keys';
import { UserHandle } from '../../types';
import { ITweet, TweetInput } from '../../types/Tweet.types';
import { generateId } from '../../utils';
import { createTweet } from './tweet.repository';

export const addTweet = async (_: any, args: { data: TweetInput }, ctx: UserHandle): Promise<ITweet> => {
  try {
    const tweetData = args.data;
    let fileName: string;

    if (tweetData.text || tweetData.imageFile) {
      if (tweetData.text.length > 150) throw new Error('Maximum 150 characters allowed');

      if (tweetData.imageFile) {
        const file = tweetData.imageFile;
        const { createReadStream, filename } = await file;
        const extension = filename.split('.')[filename.split('.').length - 1];
        fileName = `${ctx.handle}/${generateId()}.${extension}`;
        await new Promise(res =>
          createReadStream()
            .pipe(
              fbStorage.bucket(keys.firebaseStorageBucket).file(fileName).createWriteStream({
                resumable: false
              })
            )
            .on('finish', res)
        );
      }

      const tweet = await createTweet({ text: tweetData.text, fileName }, ctx.handle);

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
