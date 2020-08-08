import { rule } from 'graphql-shield';
import { UserHandle } from '../../types';

export const isAuthenticated = rule({ cache: 'contextual' })((_: any, __: any, ctx: UserHandle) => !!ctx.handle);
