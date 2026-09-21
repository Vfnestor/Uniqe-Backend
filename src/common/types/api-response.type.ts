export type ApiResponse<
  T,
> = {
  success: boolean;
  data?: T;
  message?: string;
  statusCode?: number;
  timestamp: string;
};