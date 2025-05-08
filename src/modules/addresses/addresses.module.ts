import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './application/services/addresses.service';
import { Address } from './domain/entities/address.entity';
import { AddressesRepository } from './infrastructure/repositories/addresses.repository';
import { ADDRESS_REPOSITORY } from './domain/interfaces/address.repository.interface';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), UsersModule],
  controllers: [AddressesController],
  providers: [
    AddressesService,
    {
      provide: ADDRESS_REPOSITORY,
      useClass: AddressesRepository,
    },
  ],
  exports: [
    AddressesService,
    {
      provide: ADDRESS_REPOSITORY,
      useClass: AddressesRepository,
    },
  ],
})
export class AddressesModule {}
