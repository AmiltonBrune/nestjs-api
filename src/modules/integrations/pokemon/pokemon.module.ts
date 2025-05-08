import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './application/services/pokemon.service';
import { PokeApiService } from './instrastructure/services/pokeApi.service';
import { POKEMON_SERVICE } from './application/interfaces/pokemon-service.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getPokeApiConfig } from '../../../config/pokeApi.config';

@Module({
  imports: [ConfigModule],
  controllers: [PokemonController],
  providers: [
    PokemonService,
    {
      provide: POKEMON_SERVICE,
      useClass: PokeApiService,
    },
    {
      provide: 'POKEAPI_CONFIG',
      useFactory: getPokeApiConfig,
      inject: [ConfigService],
    },
  ],
  exports: [
    PokemonService,
    {
      provide: POKEMON_SERVICE,
      useClass: PokeApiService,
    },
  ],
})
export class PokemonModule {}
