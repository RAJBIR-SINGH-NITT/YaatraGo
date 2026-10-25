export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly details?: unknown,
    public readonly code?: "network" | "timeout" | "configuration" | "http" | "parse",
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function getFriendlyApiError(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}