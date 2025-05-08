import { ApiProperty } from '@nestjs/swagger';

class TypeInfo {
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

class PokemonType {
  @ApiProperty({
    description: 'Informações do tipo',
    type: TypeInfo,
  })
  type: TypeInfo;
}

class PokemonStat {
  @ApiProperty({
    description: 'Valor base do status',
    example: 55,
  })
  base_stat: number;

  @ApiProperty({
    description: 'Nome do status',
    example: 'speed',
    required: false,
  })
  name?: string;
}

class PokemonAbility {
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

class PokemonSprite {
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
    description: 'Habilidades do Pokémon',
    type: [PokemonAbility],
  })
  abilities: PokemonAbility[];

  @ApiProperty({
    description: 'Sprites do Pokémon',
    type: PokemonSprite,
  })
  sprites: PokemonSprite;
}

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
  type: PokemonType[];

  @ApiProperty({
    description: 'Descrição do tipo do Pokémon',
    example: 'Water & Flying Type',
  })
  description: string;
}

export class SimplifiedPokemonListResponseDto {
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
    type: [SimplifiedPokemonDto],
  })
  results: SimplifiedPokemonDto[];
}
