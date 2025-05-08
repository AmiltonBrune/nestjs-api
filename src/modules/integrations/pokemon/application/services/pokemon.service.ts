import { Inject, Injectable } from '@nestjs/common';
import {
  IPokemonService,
  POKEMON_SERVICE,
} from '../interfaces/pokemon-service.interface';
import { SimplifiedPokemonDto } from '../dto/simplified-pokemon.dto';
import { SimplifiedPokemonListResponseDto } from '../dto/simplified-pokemon-list-response.dto';
import { PokemonQueryDto } from '../dto/pokemon-query.dto';
import { PokemonListResponseDto, PokemonDto } from '../dto';
@Injectable()
export class PokemonService {
  constructor(
    @Inject(POKEMON_SERVICE)
    private readonly pokemonService: IPokemonService,
  ) {}

  async findAll(
    query: PokemonQueryDto,
  ): Promise<SimplifiedPokemonListResponseDto | PokemonListResponseDto[]> {
    return this.pokemonService.findAll(query);
  }

  async findById(id: number): Promise<SimplifiedPokemonDto | PokemonDto> {
    return this.pokemonService.findById(id);
  }
}
