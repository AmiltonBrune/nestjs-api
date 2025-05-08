import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../domain/entities/category.entity';
import { ICategoryRepository } from '../../domain/interfaces/category.repository.interface';

@Injectable()
export class CategoriesRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async findById(id: string): Promise<Category | null> {
    return this.categoriesRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Category | null> {
    return this.categoriesRepository.findOne({ where: { name } });
  }

  async create(categoryData: Partial<Category>): Promise<Category> {
    const newCategory = this.categoriesRepository.create(categoryData);
    return this.categoriesRepository.save(newCategory);
  }

  async update(id: string, categoryData: Partial<Category>): Promise<Category> {
    const category = await this.findById(id);

    if (!category) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
    }
    Object.assign(category, categoryData);

    return this.categoriesRepository.save(category);
  }

  async delete(id: string): Promise<void> {
    const result = await this.categoriesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
    }
  }
}
