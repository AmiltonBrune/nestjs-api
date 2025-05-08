import { Module } from '@nestjs/common';
import { CepController } from './cep.controller';
import { CepService } from './application/services/cep.service';
import { ViaCepService } from './infrastructure/services/viaCep.service';
import { CEP_SERVICE } from './application/interfaces/cep-service.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getViaCepApiConfig } from '../../../config/viaCepApi.config';

@Module({
  imports: [ConfigModule],
  controllers: [CepController],
  providers: [
    CepService,
    {
      provide: CEP_SERVICE,
      useClass: ViaCepService,
    },
    {
      provide: 'VIA_CEP_API_CONFIG',
      useFactory: getViaCepApiConfig,
      inject: [ConfigService],
    },
  ],
  exports: [
    CepService,
    {
      provide: CEP_SERVICE,
      useClass: ViaCepService,
    },
  ],
})
export class CepModule {}
