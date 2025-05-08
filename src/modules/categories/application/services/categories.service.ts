import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  ICategoryRepository,
  CATEGORY_REPOSITORY,
} from '../../domain/interfaces/category.repository.interface';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async findAll() {
    return this.categoryRepository.findAll();
  }

  async findById(id: string) {
    return this.categoryRepository.findById(id);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.categoryRepository.findByName(
      createCategoryDto.name,
    );

    if (existingCategory) {
      throw new BadRequestException('Já existe uma categoria com este nome');
    }

    return this.categoryRepository.create(createCategoryDto);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepository.findById(id);

    if (updateCategoryDto.name) {
      const existingCategory = await this.categoryRepository.findByName(
        updateCategoryDto.name,
      );
      if (existingCategory && existingCategory.id !== id) {
        throw new BadRequestException('Já existe uma categoria com este nome');
      }
    }

    return this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: string) {
    await this.categoryRepository.delete(id);
    return { message: 'Categoria excluída com sucesso' };
  }
}
