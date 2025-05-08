import { ApiProperty } from '@nestjs/swagger';
import { PokemonType } from './pokemon-type.dto';
import { PokemonStat } from './pokemon-stat.dto';
import { PokemonSprite } from './pokemon-sprite.dto';
import { PokemonAbility } from './pokemon-ability.dto';

export class PokemonDto {
  @ApiProperty({
    description: 'ID do Pokémon',
    example: 25,
  })
  id: number;

  @ApiProperty({
    description: 'Nome do Pokémon',
    example: 'pikachu',
  })
  name: string;

  @ApiProperty({
    description: 'Imagem oficial do Pokémon',
    example:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png',
  })
  image: string;

  @ApiProperty({
    description: 'Altura do Pokémon em decímetros',
    example: 4,
  })
  height: number;

  @ApiProperty({
    description: 'Peso do Pokémon em hectogramas',
    example: 60,
  })
  weight: number;

  @ApiProperty({
    description: 'Tipos do Pokémon',
    type: [PokemonType],
  })
  types: PokemonType[];

  @ApiProperty({
    description: 'Status do Pokémon',
    type: [PokemonStat],
  })
  stats: PokemonStat[];

  @ApiProperty({
    description: 'Sprites do Pokémon',
    type: PokemonSprite,
  })
  sprites?: PokemonSprite;

  @ApiProperty({
    description: 'Abilidades do Pokémon',
    type: [PokemonAbility],
  })
  abilities?: PokemonAbility[];
}
