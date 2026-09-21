export type ApiResponse<
  T,
> = {
  success: boolean;
  data?: T;
  message?: string;
  timestamp: string;
};