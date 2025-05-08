import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nome do produto',
    example: 'Pikachu Plush',
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

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
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O preço deve ser um número com no máximo 2 casas decimais' },
  )
  @IsPositive({ message: 'O preço deve ser maior que zero' })
  @IsNotEmpty({ message: 'O preço é obrigatório' })
  price: number;

  @ApiProperty({
    description: 'Quantidade em estoque',
    example: 50,
    default: 0,
  })
  @IsNumber({}, { message: 'O estoque deve ser um número' })
  @Min(0, { message: 'O estoque não pode ser negativo' })
  @IsOptional()
  stock?: number = 0;

  @ApiProperty({
    description: 'ID da categoria do produto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'ID de categoria inválido' })
  @IsNotEmpty({ message: 'O ID da categoria é obrigatório' })
  categoryId: string;

  @ApiProperty({
    description: 'ID do usuário vendedor',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'ID de usuário inválido' })
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório' })
  userId: string;

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
