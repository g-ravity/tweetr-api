import jwt from 'jsonwebtoken';
import keys from '../config/keys';

const getUserHandle = (ctx: any): string | null => {
  try {
    const token = ctx.req.get('Authorization').replace('Bearer ', '');
    const payload = jwt.verify(token, keys.accessTokenSecret);
    return (payload as any).userHandle.toString();
  } catch (err) {
    return null;
  }
};

export default getUserHandle;
