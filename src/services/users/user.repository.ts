import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import keys from '../../config/keys';
import { IUser, UserArgs, UserWithToken } from '../../types';
import User, { UserModel } from './User';

export const createUser = async (user: UserArgs): Promise<UserModel> => {
  const salt = randomBytes(32);

  const newUser = new User({
    name: user.name,
    handle: user.handle,
    password: await argon2.hash(user.password, { salt })
  });

  return newUser.save();
};

export const generateToken = (user: IUser): UserWithToken => ({
  user,
  accessToken: jwt.sign({ userHandle: user.handle }, keys.accessTokenSecret, { expiresIn: '30d' })
});

export const findUserByHandle = async (userHandle: IUser['handle']): Promise<UserModel> => User.findOne({ handle: userHandle });
