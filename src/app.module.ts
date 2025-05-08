import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { CepModule } from './modules/integrations/cep/cep.module';
import { PokemonModule } from './modules/integrations/pokemon/pokemon.module';
import { getDatabaseConfig } from './config/database.config';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),

    UsersModule,
    AuthModule,
    CategoriesModule,
    AddressesModule,
    CepModule,
    PokemonModule,
    ProductsModule,
  ],
})
export class AppModule {}
