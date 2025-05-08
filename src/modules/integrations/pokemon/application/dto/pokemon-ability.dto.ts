import { ApiProperty } from '@nestjs/swagger';

export class PokemonAbility {
  @ApiProperty({
    description: 'Nome da habilidade',
    example: 'static',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'URL do recurso de habilidade',
    example: 'https://pokeapi.co/api/v2/ability/9/',
    required: false,
  })
  url?: string;

  @ApiProperty({
    description: 'Indica se é uma habilidade oculta',
    example: false,
  })
  is_hidden: boolean;
}
