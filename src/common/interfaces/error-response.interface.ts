export interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string | string[] | null;
  error: string;
}

export interface ExceptionResponse {
  statusCode?: number;
  message?: string | string[];
  error?: string;
}
