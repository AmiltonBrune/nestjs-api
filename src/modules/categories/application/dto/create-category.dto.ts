import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Nome da categoria',
    example: 'Pokémon Cards',
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @ApiProperty({
    description: 'Descrição da categoria',
    example: 'Cartas colecionáveis de Pokémon',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
