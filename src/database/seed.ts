import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../modules/users/domain/entities/user.entity';
import { Category } from '../modules/categories/domain/entities/category.entity';
import { Product } from '../modules/products/domain/entities/product.entity';
import { Role } from '../common/constants/roles.enum';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userRepository = app.get<Repository<User>>(getRepositoryToken(User));
  const categoryRepository = app.get<Repository<Category>>(
    getRepositoryToken(Category),
  );
  const productRepository = app.get<Repository<Product>>(
    getRepositoryToken(Product),
  );

  try {
    console.log('Iniciando seed...');

    const userCount = await userRepository.count();
    if (userCount > 0) {
      console.log('O banco de dados já possui dados. Pulando seed.');
      await app.close();
      return;
    }

    const adminPassword = await bcrypt.hash('admin123', 10);

    await userRepository.save({
      name: 'Administrador',
      email: 'admin@example.com',
      password: adminPassword,
      roles: [Role.ADMIN],
      isActive: true,
    });
    console.log('Usuário admin criado');

    const userPassword = await bcrypt.hash('user123', 10);
    await userRepository.save({
      name: 'Usuário',
      email: 'user@example.com',
      password: userPassword,
      roles: [Role.USER],
      isActive: true,
    });
    console.log('Usuário padrão criado');

    const sellerPassword = await bcrypt.hash('seller123', 10);
    const seller = await userRepository.save({
      name: 'Vendedor',
      email: 'seller@example.com',
      password: sellerPassword,
      roles: [Role.SELLER],
      isActive: true,
    });
    console.log('Usuário vendedor criado');

    const categories = await categoryRepository.save([
      {
        name: 'Cartas',
        description: 'Cartas colecionáveis de Pokémon',
      },
      {
        name: 'Pelúcias',
        description: 'Pelúcias oficiais de Pokémon',
      },
      {
        name: 'Jogos',
        description: 'Jogos de Pokémon para consoles Nintendo',
      },
      {
        name: 'Acessórios',
        description: 'Acessórios diversos de Pokémon',
      },
    ]);
    console.log('Categorias criadas');

    await productRepository.save([
      {
        name: 'Carta Pikachu Rara',
        description: 'Carta rara de Pikachu da coleção base',
        price: 29.99,
        stock: 10,
        categoryId: categories[0].id,
        userId: seller.id,
        pokemonId: 25,
        imageUrl:
          'https://assets.pokemon.com/assets/cms2/img/cards/web/SM10/SM10_EN_55.png',
      },
      {
        name: 'Pelúcia Pikachu',
        description: 'Pelúcia oficial de Pikachu com 25cm',
        price: 99.99,
        stock: 5,
        categoryId: categories[1].id,
        userId: seller.id,
        pokemonId: 25,
        imageUrl:
          'https://images.pokemoncenter.com/products/13361/P6920_701-06911_01.jpg',
      },
      {
        name: 'Pokémon Sword',
        description: 'Jogo Pokémon Sword para Nintendo Switch',
        price: 299.99,
        stock: 8,
        categoryId: categories[2].id,
        userId: seller.id,
        imageUrl:
          'https://assets.pokemon.com/assets/cms2/img/video-games/video-games/pokemon_sword_shield/sword-shield-169.jpg',
      },
      {
        name: 'Boné Ash Ketchum',
        description: 'Boné oficial do Ash Ketchum',
        price: 49.99,
        stock: 15,
        categoryId: categories[3].id,
        userId: seller.id,
        imageUrl:
          'https://m.media-amazon.com/images/I/61S2vSBbjdL._AC_UL1500_.jpg',
      },
      {
        name: 'Carta Charizard Holográfica',
        description: 'Carta holográfica rara de Charizard',
        price: 149.99,
        stock: 3,
        categoryId: categories[0].id,
        userId: seller.id,
        pokemonId: 6,
        imageUrl:
          'https://assets.pokemon.com/assets/cms2/img/cards/web/SWSH3/SWSH3_EN_20.png',
      },
      {
        name: 'Pelúcia Eevee',
        description: 'Pelúcia fofa de Eevee',
        price: 89.99,
        stock: 7,
        categoryId: categories[1].id,
        userId: seller.id,
        pokemonId: 133,
        imageUrl:
          'https://images.pokemoncenter.com/products/13347/P6920_701-06909_01.jpg',
      },
    ]);
    console.log('Produtos criados');

    console.log('Seed concluído com sucesso!');
  } catch (error) {
    console.error('Erro durante o seed:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
