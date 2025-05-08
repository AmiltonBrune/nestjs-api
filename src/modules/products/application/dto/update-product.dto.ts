import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    description: 'Nome do produto',
    example: 'Pikachu Plush',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Descrição do produto',
    example: 'Pelúcia oficial de Pikachu',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Preço do produto',
    example: 29.99,
    required: false,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O preço deve ser um número com no máximo 2 casas decimais' },
  )
  @IsPositive({ message: 'O preço deve ser maior que zero' })
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Quantidade em estoque',
    example: 50,
    required: false,
  })
  @IsNumber({}, { message: 'O estoque deve ser um número' })
  @Min(0, { message: 'O estoque não pode ser negativo' })
  @IsOptional()
  stock?: number;

  @ApiProperty({
    description: 'ID da categoria do produto',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID('4', { message: 'ID de categoria inválido' })
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    description: 'Status do produto (ativo/inativo)',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    description: 'URL da imagem do produto',
    example: 'https://example.com/pikachu.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'ID do Pokémon relacionado ao produto',
    example: 25,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  pokemonId?: number;
}
