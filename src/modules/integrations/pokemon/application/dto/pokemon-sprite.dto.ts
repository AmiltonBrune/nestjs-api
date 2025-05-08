import { ApiProperty } from '@nestjs/swagger';

export class PokemonSprite {
  @ApiProperty({
    description: 'URL da sprite frontal padrão',
    example:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  })
  front_default: string;

  @ApiProperty({
    description: 'URL da sprite traseira padrão',
    example:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
  })
  back_default: string;

  @ApiProperty({
    description: 'URL da sprite frontal shiny',
    example:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png',
  })
  front_shiny: string;

  @ApiProperty({
    description: 'URL da sprite traseira shiny',
    example:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png',
  })
  back_shiny: string;
}
