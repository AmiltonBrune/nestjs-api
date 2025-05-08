export interface ApiResponse<T> {
  data: T | null;
  statusCode: number;
  message?: string;
  timestamp?: string;
  errors?: string[] | Record<string, any>;
}
