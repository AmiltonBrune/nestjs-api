import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

export class UpdateAddressDto {
  @ApiProperty({
    description: 'CEP (Código de Endereçamento Postal)',
    example: '01310100',
    required: false,
  })
  @IsString()
  @Length(8, 8, { message: 'O CEP deve ter 8 caracteres' })
  @Matches(/^[0-9]+$/, { message: 'O CEP deve conter apenas números' })
  @IsOptional()
  cep?: string;

  @ApiProperty({
    description: 'Rua/Logradouro',
    example: 'Av. Paulista',
    required: false,
  })
  @IsString()
  @IsOptional()
  street?: string;

  @ApiProperty({
    description: 'Número',
    example: '1000',
    required: false,
  })
  @IsString()
  @IsOptional()
  number?: string;

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
    required: false,
  })
  @IsString()
  @IsOptional()
  neighborhood?: string;

  @ApiProperty({
    description: 'Cidade',
    example: 'São Paulo',
    required: false,
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    description: 'Estado (UF)',
    example: 'SP',
    required: false,
  })
  @IsString()
  @Length(2, 2, { message: 'O estado deve ter 2 caracteres' })
  @IsOptional()
  state?: string;

  @ApiProperty({
    description: 'Status do endereço (ativo/inativo)',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID('4', { message: 'ID de usuário inválido' })
  @IsOptional()
  userId?: string;
}
