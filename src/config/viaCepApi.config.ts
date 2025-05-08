import { ConfigService } from '@nestjs/config';
import { IntegrationConfig } from '../common/interfaces/integration.interface';

export const getViaCepApiConfig = (
  configService: ConfigService,
): IntegrationConfig => ({
  baseUrl: configService.get<string>(
    'VIA_CEP_API_URL',
    'https://viacep.com.br/ws/',
  ),
});
