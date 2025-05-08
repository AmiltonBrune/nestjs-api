import { ApiProperty } from '@nestjs/swagger';

export class TypeInfo {
  @ApiProperty({
    description: 'Nome do tipo do Pokémon',
    example: 'grass',
  })
  name: string;

  @ApiProperty({
    description: 'URL do recurso de tipo',
    example: 'https://pokeapi.co/api/v2/type/12/',
  })
  url: string;
}
