import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ErrorResponse,
  ExceptionResponse,
} from '../interfaces/error-response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus() as HttpStatus;

    const errorResponse: ErrorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.message || null,
      error: exception.name,
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${request.method} ${request.url}`,
        exception.stack,
        'ExceptionFilter',
      );

      if (process.env.NODE_ENV === 'production') {
        errorResponse.message = 'Erro interno do servidor';
      }
    } else {
      this.logger.warn(
        `${request.method} ${request.url} - Erro: ${exception.message}`,
      );
    }

    if (exception.getResponse && typeof exception.getResponse() === 'object') {
      const exceptionResponse = exception.getResponse() as ExceptionResponse;
      if (exceptionResponse.message) {
        errorResponse.message = exceptionResponse.message;
      }
    }

    response.status(status).json(errorResponse);
  }
}
