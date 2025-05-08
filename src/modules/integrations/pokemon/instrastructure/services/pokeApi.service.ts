import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { IPokemonService } from '../../application/interfaces/pokemon-service.interface';
import { PokemonDto } from '../../application/dto/pokemon.dto';
import { PokemonListResponseDto } from '../../application/dto/pokemon-list-response.dto';
import { SimplifiedPokemonDto } from '../../application/dto/simplified-pokemon.dto';
import { SimplifiedPokemonListResponseDto } from '../../application/dto/simplified-pokemon-list-response.dto';
import { PokemonQueryDto } from '../../application/dto/pokemon-query.dto';
import { IntegrationConfig } from '../../../../../common/interfaces/integration.interface';

@Injectable()
export class PokeApiService implements IPokemonService {
  constructor(
    @Inject('POKEAPI_CONFIG') private readonly config: IntegrationConfig,
  ) {}

  private get baseUrl(): string {
    return this.config.baseUrl;
  }

  private mapToSimplifiedPokemon(
    pokemonData: PokemonDto,
  ): SimplifiedPokemonDto | PokemonDto {
    const types = pokemonData.types.map((t) => t.type.name).join(', ');
    const sprites = pokemonData.sprites as {
      front_default: string;
      other?: { 'official-artwork'?: { front_default: string } };
    };
    const officialArtwork = sprites.other?.['official-artwork']?.front_default;
    const image = officialArtwork || sprites.front_default;
    if (!image) {
      throw new Error('No image URL available for Pokémon');
    }
    return {
      id: pokemonData.id,
      name: pokemonData.name,
      image,
      type: types,
    };
  }

  private mapToPokemon(pokemonData: PokemonDto): PokemonDto {
    const sprites = pokemonData.sprites as {
      front_default: string;
      other?: { 'official-artwork'?: { front_default: string } };
    };
    const officialArtwork = sprites.other?.['official-artwork']?.front_default;
    const image = officialArtwork || sprites.front_default;

    return {
      id: pokemonData.id,
      name: pokemonData.name,
      image,
      types: pokemonData.types,
      height: pokemonData.height,
      weight: pokemonData.weight,
      stats: pokemonData.stats,
      abilities: pokemonData.abilities,
    };
  }

  async findAll(
    query: PokemonQueryDto,
  ): Promise<SimplifiedPokemonListResponseDto> {
    try {
      const limit = query?.limit ?? 20;
      const offset = query?.offset ?? 0;

      if (query.name) {
        try {
          const response = await axios.get(
            `${this.baseUrl}/pokemon/${query.name.toLowerCase()}`,
          );
          const pokemonData = response.data as PokemonDto;

          const simplified = this.mapToSimplifiedPokemon(pokemonData);

          return {
            count: 1,
            next: null,
            previous: null,
            results: [simplified],
          };
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new HttpException(
              `Pokémon com nome '${query.name}' não encontrado`,
              HttpStatus.NOT_FOUND,
            );
          }

          console.error('Erro ao buscar Pokémon por nome:', error);
          throw new HttpException(
            'Erro ao consultar a PokeAPI. Tente novamente mais tarde.',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }

      const response: AxiosResponse = await axios.get(
        `${this.baseUrl}/pokemon`,
        {
          params: { limit, offset: offset * limit },
        },
      );

      const pokemonList = response.data as PokemonListResponseDto;

      const detailedResults = await Promise.all(
        pokemonList.results.map(async (pokemon) => {
          try {
            const detailResponse = await axios.get(
              `${this.baseUrl}/pokemon/${pokemon.name}`,
            );
            const pokemonData = detailResponse.data as PokemonDto;
            return this.mapToSimplifiedPokemon(pokemonData);
          } catch (error) {
            console.error(
              `Erro ao buscar detalhes para ${pokemon.name}:`,
              error,
            );
            return null;
          }
        }),
      );

      const validResults = detailedResults.filter((result) => result !== null);

      return {
        count: pokemonList.count,
        next: pokemonList.next,
        previous: pokemonList.previous,
        results: validResults,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      console.error('Erro na PokeAPI:', error);
      throw new HttpException(
        'Erro ao consultar a PokeAPI. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: number): Promise<PokemonDto> {
    try {
      const response = await axios.get(`${this.baseUrl}/pokemon/${id}`);

      const pokemonData = response.data as PokemonDto;

      return this.mapToPokemon(pokemonData);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new HttpException(
          `Pokémon com ID ${id} não encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }

      console.error('Erro na PokeAPI:', error);
      throw new HttpException(
        'Erro ao consultar a PokeAPI. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
