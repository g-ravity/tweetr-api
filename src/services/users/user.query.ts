import { IUser, UserHandle } from '../../types';
import { findUserByHandle } from './user.repository';

export const me = async (_: any, __: any, ctx: UserHandle): Promise<IUser> => {
  try {
    const user = await findUserByHandle(ctx.handle);
    delete user.password;

    if (user) return user;

    throw new Error('User not found');
  } catch (err) {
    return err;
  }
};
