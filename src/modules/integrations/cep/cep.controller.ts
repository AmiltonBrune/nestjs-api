import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../common/decorators/public.decorator';
import { CepService } from './application/services/cep.service';

@ApiTags('cep')
@Controller('cep')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @Public()
  @Get(':cep')
  @ApiOperation({ summary: 'Buscar endereço pelo CEP' })
  @ApiParam({
    name: 'cep',
    description: 'CEP (apenas números)',
    example: '01310100',
  })
  @ApiResponse({ status: 200, description: 'Endereço encontrado' })
  @ApiResponse({ status: 400, description: 'Formato de CEP inválido' })
  @ApiResponse({ status: 404, description: 'CEP não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  findAddressByCep(@Param('cep') cep: string) {
    return this.cepService.findAddressByCep(cep);
  }
}
