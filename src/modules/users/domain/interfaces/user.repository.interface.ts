import { User } from '../entities/user.entity';
import { PaginationDto } from '../../../../common/dtos/pagination.dto';

export interface IUserRepository {
  findAll(pagination?: PaginationDto): Promise<{ data: User[]; total: number }>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Partial<User>): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}

export const USER_REPOSITORY = 'USER_REPOSITORY';
