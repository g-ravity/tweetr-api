import { Keys } from '../types';

const keys: Keys = {
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  accessTokenSecret: process.env.ACCESS_SECRET_KEY
};

export default keys;
