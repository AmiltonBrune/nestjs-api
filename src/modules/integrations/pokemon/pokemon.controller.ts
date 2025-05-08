import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PokemonService } from './application/services/pokemon.service';
import { PokemonQueryDto } from './application/dto/pokemon-query.dto';
import { Public } from '../../../common/decorators/public.decorator';

@ApiTags('pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar Pokémon com filtros e paginação' })
  @ApiQuery({ name: 'name', required: false, description: 'Filtrar por nome' })
  @ApiQuery({ name: 'type', required: false, description: 'Filtrar por tipo' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limite de resultados por página',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Número da página (começando em 0)',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de Pokémon retornada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Parâmetros de consulta inválidos' })
  @ApiResponse({ status: 404, description: 'Tipo de Pokémon não encontrado' })
  findAll(@Query() query: PokemonQueryDto) {
    return this.pokemonService.findAll(query);
  }

  @Public()
  @Get('id/:id')
  @ApiOperation({ summary: 'Buscar um Pokémon pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do Pokémon' })
  @ApiResponse({ status: 200, description: 'Pokémon encontrado' })
  @ApiResponse({ status: 404, description: 'Pokémon não encontrado' })
  findById(@Param('id') id: string) {
    return this.pokemonService.findById(+id);
  }
}
