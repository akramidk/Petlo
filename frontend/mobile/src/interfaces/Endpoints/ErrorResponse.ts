export interface ErrorResponse {
  status: "failed";
  error: {
    code: number;
    message: string;
  };
}
