import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../../domain/entities/address.entity';
import { IAddressRepository } from '../../domain/interfaces/address.repository.interface';

@Injectable()
export class AddressesRepository implements IAddressRepository {
  constructor(
    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,
  ) {}

  async findAll(): Promise<Address[]> {
    return this.addressesRepository.find({
      relations: ['user'],
    });
  }

  async findById(id: string): Promise<Address | null> {
    const address = await this.addressesRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    return address;
  }

  async findByUser(userId: string): Promise<Address[]> {
    return this.addressesRepository.find({
      where: { userId },
      relations: ['user'],
    });
  }

  async create(addressData: Partial<Address>): Promise<Address> {
    const newAddress = this.addressesRepository.create(addressData);
    return this.addressesRepository.save(newAddress);
  }

  async update(id: string, addressData: Partial<Address>): Promise<Address> {
    const address = await this.findById(id);

    if (!address) {
      throw new NotFoundException(`Endereço com ID ${id} não encontrado`);
    }

    Object.assign(address, addressData);

    return this.addressesRepository.save(address);
  }

  async delete(id: string): Promise<void> {
    const result = await this.addressesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Endereço com ID ${id} não encontrado`);
    }
  }
}
