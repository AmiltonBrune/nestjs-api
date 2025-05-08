import { Request } from 'express';
import { Role } from '../constants/roles.enum';

export interface RequestWithUser extends Request {
  user: {
    id: string;
    role: Role;
  };
}
