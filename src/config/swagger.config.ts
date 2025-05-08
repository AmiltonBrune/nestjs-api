import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('NestJS Pokemon API')
    .setDescription(
      'API completa para uma loja Pokémon e integração com PokeAPI',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('auth', 'Autenticação')
    .addTag('users', 'Gerenciamento de Usuários')
    .addTag('products', 'Gerenciamento de Produtos')
    .addTag('categories', 'Gerenciamento de Categorias')
    .addTag('addresses', 'Gerenciamento de Endereços')
    .addTag('orders', 'Gerenciamento de Pedidos')
    .addTag('cep', 'Consulta de CEP')
    .addTag('pokemon', 'Consulta de Pokémon')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}
