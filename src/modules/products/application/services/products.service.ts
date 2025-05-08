import { Inject, Injectable } from '@nestjs/common';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../domain/interfaces/product.reepository.interface';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import {
  CATEGORY_REPOSITORY,
  ICategoryRepository,
} from '../../../categories/domain/interfaces/category.repository.interface';
import { PaginationDto } from '../../../../common/dtos/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,

    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async findAll(userId: string, paginationDto: PaginationDto) {
    const { data, total } = await this.productRepository.findAll(
      userId,
      paginationDto,
    );
    const limit = paginationDto.limit ?? 10;
    return {
      data,
      total,
      page: paginationDto.page ?? 1,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string) {
    return this.productRepository.findById(id);
  }

  async findByCategory(categoryId: string, paginationDto: PaginationDto) {
    await this.categoryRepository.findById(categoryId);

    const { data, total } = await this.productRepository.findByCategory(
      categoryId,
      paginationDto,
    );
    const limit = paginationDto.limit ?? 10;
    return {
      data,
      total,
      page: paginationDto.page ?? 1,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByUser(userId: string, paginationDto: PaginationDto) {
    const { data, total } = await this.productRepository.findByUser(
      userId,
      paginationDto,
    );
    const limit = paginationDto.limit ?? 10;
    return {
      data,
      total,
      page: paginationDto.page ?? 1,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(createProductDto: CreateProductDto) {
    await this.categoryRepository.findById(createProductDto.categoryId);

    return this.productRepository.create(createProductDto);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.productRepository.findById(id);

    if (updateProductDto.categoryId) {
      await this.categoryRepository.findById(updateProductDto.categoryId);
    }

    return this.productRepository.update(id, updateProductDto);
  }

  async remove(id: string) {
    await this.productRepository.delete(id);
    return { message: 'Produto excluído com sucesso' };
  }
}
