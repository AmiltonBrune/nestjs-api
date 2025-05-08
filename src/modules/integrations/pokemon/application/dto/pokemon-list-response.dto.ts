import { ApiProperty } from '@nestjs/swagger';
import { PokemonDto } from './pokemon.dto';

export class PokemonListResponseDto {
  @ApiProperty({
    description: 'Contagem total de resultados',
    example: 1118,
  })
  count: number;

  @ApiProperty({
    description: 'URL para a próxima página de resultados',
    example: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
    required: false,
  })
  next: string | null;

  @ApiProperty({
    description: 'URL para a página anterior de resultados',
    example: null,
    required: false,
  })
  previous: string | null;

  @ApiProperty({
    description: 'Lista de Pokémon',
    type: [PokemonDto],
  })
  results: PokemonDto[];
}
