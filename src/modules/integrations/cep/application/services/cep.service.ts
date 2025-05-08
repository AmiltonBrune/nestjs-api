import { Inject, Injectable } from '@nestjs/common';
import { ICepService, CEP_SERVICE } from '../interfaces/cep-service.interface';
import { CepResponseDto } from '../dto/cep-response.dto';

@Injectable()
export class CepService {
  constructor(
    @Inject(CEP_SERVICE)
    private readonly cepService: ICepService,
  ) {}

  async findAddressByCep(cep: string): Promise<CepResponseDto> {
    return this.cepService.findAddressByCep(cep);
  }
}
