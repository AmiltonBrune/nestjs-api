import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './application/services/products.service';
import { Product } from './domain/entities/product.entity';
import { ProductsRepository } from './infrastructure/repositories/products.repository';
import { PRODUCT_REPOSITORY } from './domain/interfaces/product.reepository.interface';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoriesModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductsRepository,
    },
  ],
  exports: [
    ProductsService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductsRepository,
    },
  ],
})
export class ProductsModule {}
