import { Role } from '../../../../common/constants/roles.enum';
import { Address } from '../../../addresses/domain/entities/address.entity';
import { Order } from '../../../orders/domain/entities/order.entity';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: Role[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  addresses: Address[];
  orders: Order[];
}
