import { ApiProperty } from '@nestjs/swagger';

export class CepResponseDto {
  @ApiProperty({
    description: 'CEP',
    example: '01310100',
  })
  cep: string;

  @ApiProperty({
    description: 'Logradouro',
    example: 'Avenida Paulista',
  })
  logradouro: string;

  @ApiProperty({
    description: 'Complemento',
    example: 'de 1 ao 610 - lado par',
  })
  complemento: string;

  @ApiProperty({
    description: 'Bairro',
    example: 'Bela Vista',
  })
  bairro: string;

  @ApiProperty({
    description: 'Cidade',
    example: 'São Paulo',
  })
  localidade: string;

  @ApiProperty({
    description: 'Estado (UF)',
    example: 'SP',
  })
  uf: string;

  @ApiProperty({
    description: 'IBGE',
    example: '3550308',
  })
  ibge: string;

  @ApiProperty({
    description: 'GIA',
    example: '1004',
  })
  gia: string;

  @ApiProperty({
    description: 'DDD',
    example: '11',
  })
  ddd: string;

  @ApiProperty({
    description: 'SIAFI',
    example: '7107',
  })
  siafi: string;
}
