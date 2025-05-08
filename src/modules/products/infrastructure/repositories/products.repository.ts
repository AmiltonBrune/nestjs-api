import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../domain/entities/product.entity';
import { IProductRepository } from '../../domain/interfaces/product.reepository.interface';
import { PaginationDto } from '../../../../common/dtos/pagination.dto';

@Injectable()
export class ProductsRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(
    userId?: string,
    pagination?: PaginationDto,
  ): Promise<{ data: Product[]; total: number }> {
    const queryBuilder = this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.user', 'user');

    if (userId) {
      queryBuilder.where('product.userId != :userId', { userId });
    }

    const total = await queryBuilder.getCount();

    if (pagination) {
      queryBuilder.skip(pagination.skip).take(pagination.limit);
    }

    const data = await queryBuilder.getMany();

    return { data, total };
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category', 'user'],
    });

    return product;
  }

  async findByName(name: string): Promise<Product | null> {
    return this.productsRepository.findOne({
      where: { name },
      relations: ['category', 'user'],
    });
  }

  async findByCategory(
    categoryId: string,
    pagination?: PaginationDto,
  ): Promise<{ data: Product[]; total: number }> {
    const queryBuilder = this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.user', 'user')
      .where('product.categoryId = :categoryId', { categoryId });

    const total = await queryBuilder.getCount();

    if (pagination) {
      queryBuilder.skip(pagination.skip).take(pagination.limit);
    }

    const data = await queryBuilder.getMany();

    return { data, total };
  }

  async findByUser(
    userId: string,
    pagination?: PaginationDto,
  ): Promise<{ data: Product[]; total: number }> {
    const queryBuilder = this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.user', 'user')
      .where('product.userId = :userId', { userId });

    const total = await queryBuilder.getCount();

    if (pagination) {
      queryBuilder.skip(pagination.skip).take(pagination.limit);
    }

    const data = await queryBuilder.getMany();

    return { data, total };
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const newProduct = this.productsRepository.create(productData);
    return this.productsRepository.save(newProduct);
  }

  async update(id: string, productData: Partial<Product>): Promise<Product> {
    const product = await this.findById(id);

    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    Object.assign(product, productData);

    return this.productsRepository.save(product);
  }

  async delete(id: string): Promise<void> {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
  }
}
