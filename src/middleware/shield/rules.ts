import { rule } from 'graphql-shield';

export const isAuthenticated = rule({ cache: 'contextual' })((_: any, __: any, ctx: { userHandle: string }) => !!ctx.userHandle);
