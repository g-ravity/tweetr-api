import mongoose, { Document, Schema } from 'mongoose';

/**
 * Types
 */
export interface UserModel extends Document {
  name: string;
  handle: string;
  password: string;
}

/**
 * Models
 */
const userSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  handle: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model<UserModel>('User', userSchema);

export default User;
