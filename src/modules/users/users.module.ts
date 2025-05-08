import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './application/services/users.services';
import { User } from './domain/entities/user.entity';
import { UsersRepository } from './infrastructure/repositories/users.repository';
import { USER_REPOSITORY } from './domain/repositories/user.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USER_REPOSITORY,
      useClass: UsersRepository,
    },
  ],
  exports: [
    UsersService,
    {
      provide: USER_REPOSITORY,
      useClass: UsersRepository,
    },
  ],
})
export class UsersModule {}
