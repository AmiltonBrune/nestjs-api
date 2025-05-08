import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../../../../common/constants/roles.enum';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao@email.com',
    required: false,
  })
  @IsEmail({}, { message: 'Email inválido' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
    required: false,
  })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'Papéis do usuário',
    enum: Role,
    isArray: true,
    required: false,
  })
  @IsEnum(Role, { each: true, message: 'Papel inválido' })
  @IsOptional()
  roles?: Role[];

  @ApiProperty({
    description: 'Status do usuário (ativo/inativo)',
    example: true,
    required: false,
  })
  @IsOptional()
  isActive?: boolean;
}
