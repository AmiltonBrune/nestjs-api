import { ApiProperty } from '@nestjs/swagger';

export class PokemonStat {
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
