import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'CEP (Código de Endereçamento Postal)',
    example: '01310100',
  })
  @IsString()
  @Length(8, 8, { message: 'O CEP deve ter 8 caracteres' })
  @Matches(/^[0-9]+$/, { message: 'O CEP deve conter apenas números' })
  @IsNotEmpty({ message: 'O CEP é obrigatório' })
  cep: string;

  @ApiProperty({
    description: 'Rua/Logradouro',
    example: 'Av. Paulista',
  })
  @IsString()
  @IsNotEmpty({ message: 'A rua é obrigatória' })
  street: string;

  @ApiProperty({
    description: 'Número',
    example: '1000',
  })
  @IsString()
  @IsNotEmpty({ message: 'O número é obrigatório' })
  number: string;

  @ApiProperty({
    description: 'Complemento',
    example: 'Apto 123',
    required: false,
  })
  @IsString()
  @IsOptional()
  complement?: string;

  @ApiProperty({
    description: 'Bairro',
    example: 'Bela Vista',
  })
  @IsString()
  @IsNotEmpty({ message: 'O bairro é obrigatório' })
  neighborhood: string;

  @ApiProperty({
    description: 'Cidade',
    example: 'São Paulo',
  })
  @IsString()
  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  city: string;

  @ApiProperty({
    description: 'Estado (UF)',
    example: 'SP',
  })
  @IsString()
  @Length(2, 2, { message: 'O estado deve ter 2 caracteres' })
  @IsNotEmpty({ message: 'O estado é obrigatório' })
  state: string;

  @ApiProperty({
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'ID de usuário inválido' })
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório' })
  userId: string;
}
