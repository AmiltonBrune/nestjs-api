import { CepResponseDto } from '../dto/cep-response.dto';

export interface ICepService {
  findAddressByCep(cep: string): Promise<CepResponseDto>;
}

export const CEP_SERVICE = 'CEP_SERVICE';
