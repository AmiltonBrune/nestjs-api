import { ConfigService } from '@nestjs/config';
import { IntegrationConfig } from '../common/interfaces/integration.interface';

export const getPokeApiConfig = (
  configService: ConfigService,
): IntegrationConfig => ({
  baseUrl: configService.get<string>(
    'POKEAPI_BASE_URL',
    'https://pokeapi.co/api/v2',
  ),
});
