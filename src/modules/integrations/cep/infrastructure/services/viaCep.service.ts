import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ICepService } from '../../application/interfaces/cep-service.interface';
import { CepResponseDto } from '../../application/dto/cep-response.dto';
import { ViaCepErrorResponse } from '../../application/interfaces/via-cep-error-response.interface.tsvia-cep-error-response.interface';
import { IntegrationConfig } from '../../../../../common/interfaces/integration.interface';

@Injectable()
export class ViaCepService implements ICepService {
  constructor(
    @Inject('VIA_CEP_API_CONFIG')
    private readonly config: IntegrationConfig,
  ) {}

  async findAddressByCep(cep: string): Promise<CepResponseDto> {
    const cleanCep = cep.replace(/\D/g, '');

    if (cleanCep.length !== 8) {
      throw new HttpException(
        'Formato de CEP inválido. Deve conter 8 dígitos numéricos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const response: AxiosResponse = await axios.get(
        `${this.config.baseUrl}/${cleanCep}/json`,
      );

      if ((response.data as ViaCepErrorResponse).erro) {
        throw new HttpException('CEP não encontrado', HttpStatus.NOT_FOUND);
      }

      return response.data as CepResponseDto;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (error instanceof AxiosError) {
        throw new HttpException('CEP não encontrado', HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Erro ao consultar o CEP. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
