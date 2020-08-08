import mongoose, { Document } from 'mongoose';

/**
 * Types
 */
export interface TweetModel extends Document {
  userHandle: string;
  text: string;
  hashtags: Array<{
    text: string;
    indices: [number, number];
  }>;
  imageURL?: string;
}

/**
 * Models
 */
const tweetSchema = new mongoose.Schema({
  userHandle: { type: String, required: true },
  text: { type: String, required: false, default: '', maxlength: 150 },
  hashtags: {
    type: [
      {
        text: { type: String },
        indices: { type: [Number, Number] }
      }
    ],
    required: false,
    default: []
  },
  imageURL: { type: String, required: false }
});

const Tweet = mongoose.model<TweetModel>('Tweet', tweetSchema);

export default Tweet;
