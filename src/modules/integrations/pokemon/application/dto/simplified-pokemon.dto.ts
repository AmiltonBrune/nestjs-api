import { ApiProperty } from '@nestjs/swagger';

export class SimplifiedPokemonDto {
  @ApiProperty({
    description: 'ID do Pokémon',
    example: 7,
  })
  id: number;

  @ApiProperty({
    description: 'Nome do Pokémon',
    example: 'Gyarados',
  })
  name: string;

  @ApiProperty({
    description: 'Imagem oficial do Pokémon',
    example:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png',
  })
  image: string;

  @ApiProperty({
    description: 'Tipo principal do Pokémon',
    example: 'water',
  })
  type: string;
}
