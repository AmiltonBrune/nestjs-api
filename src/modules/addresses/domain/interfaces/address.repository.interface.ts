import { Address } from '../entities/address.entity';

export interface IAddressRepository {
  findAll(): Promise<Address[]>;
  findById(id: string): Promise<Address | null>;
  findByUser(userId: string): Promise<Address[]>;
  create(address: Partial<Address>): Promise<Address>;
  update(id: string, address: Partial<Address>): Promise<Address>;
  delete(id: string): Promise<void>;
}

export const ADDRESS_REPOSITORY = 'ADDRESS_REPOSITORY';
