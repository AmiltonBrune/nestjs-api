import { PokemonQueryDto } from '../dto/pokemon-query.dto';
import { SimplifiedPokemonDto } from '../dto/simplified-pokemon.dto';
import { SimplifiedPokemonListResponseDto } from '../dto/simplified-pokemon-list-response.dto';
import { PokemonDto, PokemonListResponseDto } from '../dto';

export interface IPokemonService {
  findAll(
    query: PokemonQueryDto,
  ): Promise<SimplifiedPokemonListResponseDto | PokemonListResponseDto[]>;
  findById(id: number): Promise<SimplifiedPokemonDto | PokemonDto>;
}

export const POKEMON_SERVICE = 'POKEMON_SERVICE';
