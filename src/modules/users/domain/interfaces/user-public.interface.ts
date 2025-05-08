import { User } from './user.interface';

export type UserPublic = Omit<User, 'password'>;
