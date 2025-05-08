import { Product } from '../entities/product.entity';
import { PaginationDto } from '../../../../common/dtos/pagination.dto';

export interface IProductRepository {
  findAll(
    userId?: string,
    pagination?: PaginationDto,
  ): Promise<{ data: Product[]; total: number }>;
  findById(id: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  findByCategory(
    categoryId: string,
    pagination?: PaginationDto,
  ): Promise<{ data: Product[]; total: number }>;
  findByUser(
    userId: string,
    pagination?: PaginationDto,
  ): Promise<{ data: Product[]; total: number }>;
  create(product: Partial<Product>): Promise<Product>;
  update(id: string, product: Partial<Product>): Promise<Product>;
  delete(id: string): Promise<void>;
}

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';
