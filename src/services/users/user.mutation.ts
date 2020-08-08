import argon2 from 'argon2';
import * as Yup from 'yup';
import { UserWithToken } from '../../types';
import { UserArgs } from './../../types/User.types';
import { createUser, findUserByHandle, generateToken } from './user.repository';

/**
 * Validation Schema
 */
const SignupSchema = Yup.object()
  .shape({
    handle: Yup.string()
      .required('Required')
      .matches(/^[_a-z0-9]*$/, { message: 'Only underscore, lowercase letters & digits allowed' }),
    name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
    password: Yup.string().min(8, 'Too Short!').max(255, 'Too Long!').required('Required')
  })
  .strict(true)
  .noUnknown();

const LoginSchema = Yup.object()
  .shape({
    handle: Yup.string()
      .required('Required')
      .matches(/^[_a-z0-9]*$/, { message: 'Only underscore, lowercase letters & digits allowed' }),
    password: Yup.string().min(8, 'Too Short!').max(255, 'Too Long!').required('Required')
  })
  .strict(true)
  .noUnknown();

/**
 * Mutations
 */
export const signup = async (_: any, args: { data: UserArgs }): Promise<UserWithToken> => {
  const userData = args.data;
  try {
    await SignupSchema.validate(userData, { abortEarly: false });

    const user = await findUserByHandle(userData.handle);
    if (user) throw new Error('User already registered');

    const newUser = await createUser(userData);
    delete newUser.password;

    return generateToken(newUser);
  } catch (err) {
    return err;
  }
};

export const login = async (_: any, args: { data: Pick<UserArgs, 'handle' | 'password'> }): Promise<UserWithToken> => {
  const userData = args.data;
  try {
    await LoginSchema.validate(userData, { abortEarly: false });

    const user = await findUserByHandle(userData.handle);
    if (user) {
      const validPassword = await argon2.verify(user.password, userData.password);
      if (validPassword) {
        delete user.password;

        return generateToken(user);
      }
    }
    throw new Error('Incorrect email or password');
  } catch (err) {
    return err;
  }
};
