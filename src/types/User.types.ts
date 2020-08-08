import { UserModel } from '../services/users/User';

export interface UserArgs {
  name: UserModel['name'];
  handle: UserModel['handle'];
  password: UserModel['password'];
}

export type IUser = Omit<UserArgs, 'password'>;

export interface UserWithToken {
  user: IUser;
  accessToken: string;
}
