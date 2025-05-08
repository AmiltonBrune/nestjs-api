import { UsersModule } from './modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

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
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const config = configService as {
          get: (key: string) => string | undefined;
        };
        return {
          type: 'postgres',
          host: config.get('DB_HOST') || 'localhost',
          port: Number(config.get('DB_PORT') || 5432),
          username: config.get('DB_USERNAME') || 'postgres',
          password: config.get('DB_PASSWORD') || 'postgres',
          database: config.get('DB_DATABASE') || 'pokemon_api',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: config.get('NODE_ENV') === 'development',
          logging: config.get('NODE_ENV') === 'development',
        };
      },
    }),

    UsersModule,
  ],
})
export class AppModule {}
