import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './application/services/categories.service';
import { Category } from './domain/entities/category.entity';
import { CategoriesRepository } from './infrastruture/repositories/categories.repository';
import { CATEGORY_REPOSITORY } from './domain/interfaces/category.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoriesRepository,
    },
  ],
  exports: [
    CategoriesService,
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoriesRepository,
    },
  ],
})
export class CategoriesModule {}
