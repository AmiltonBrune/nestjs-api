import { Inject, Injectable } from '@nestjs/common';
import {
  IAddressRepository,
  ADDRESS_REPOSITORY,
} from '../../domain/interfaces/address.repository.interface';
import { CreateAddressDto } from '../../application/dto/create-adress.dto';
import { UpdateAddressDto } from '../../application/dto/update-addres.dto';
import {
  USER_REPOSITORY,
  IUserRepository,
} from '../../../users/domain/interfaces/user.repository.interface';

@Injectable()
export class AddressesService {
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private readonly addressRepository: IAddressRepository,

    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async findAll() {
    return this.addressRepository.findAll();
  }

  async findById(id: string) {
    return this.addressRepository.findById(id);
  }

  async findByUser(userId: string) {
    await this.userRepository.findById(userId);

    return this.addressRepository.findByUser(userId);
  }

  async create(createAddressDto: CreateAddressDto) {
    await this.userRepository.findById(createAddressDto.userId);

    return this.addressRepository.create(createAddressDto);
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    await this.addressRepository.findById(id);

    if (updateAddressDto.userId) {
      await this.userRepository.findById(updateAddressDto.userId);
    }

    return this.addressRepository.update(id, updateAddressDto);
  }

  async remove(id: string) {
    await this.addressRepository.delete(id);
    return { message: 'Endereço excluído com sucesso' };
  }
}
