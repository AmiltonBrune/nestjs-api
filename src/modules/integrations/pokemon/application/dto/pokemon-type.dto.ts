import { ApiProperty } from '@nestjs/swagger';
import { TypeInfo } from './type-info.dto';

export class PokemonType {
  @ApiProperty({
    description: 'Informações do tipo',
    type: TypeInfo,
  })
  type: TypeInfo;
}
