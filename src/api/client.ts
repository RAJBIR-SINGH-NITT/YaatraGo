import { ApiError } from "./errors";

const DEFAULT_TIMEOUT_MS = 12_000;

export const isMockMode = import.meta.env.VITE_USE_MOCKS !== "false";
export function getApiBaseUrl(): string {
  // Deployment configuration wins; Settings supplies a local-development fallback.
  const configured = import.meta.env.VITE_API_BASE_URL ?? localStorage.getItem("yaatrago-server-address") ?? "";
  return configured.replace(/\/$/, "");
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  timeoutMs?: number;
  token?: string | null;
  retryGet?: boolean;
}

async function readResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204 || response.headers.get("content-length") === "0") return undefined;
  const contentType = response.headers.get("content-type") ?? "";
  const text = await response.text();
  if (!text) return undefined;
  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(text) as unknown;
    } catch {
      throw new ApiError("The server returned invalid JSON.", response.status, text, "parse");
    }
  }
  return text;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (isMockMode) {
    throw new ApiError("This call is unavailable in demo mode.", undefined, undefined, "configuration");
  }
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) {
    throw new ApiError("No verified API server is configured. Add VITE_API_BASE_URL after confirming the backend contract.", undefined, undefined, "configuration");
  }

  const method = (options.method ?? "GET").toUpperCase();
  const attempts = method === "GET" && options.retryGet !== false ? 2 : 1;
  let latestError: unknown;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), options.timeoutMs ?? DEFAULT_TIMEOUT_MS);
    const externalSignal = options.signal;
    const abortExternal = () => controller.abort();
    externalSignal?.addEventListener("abort", abortExternal, { once: true });

    try {
      const response = await fetch(`${baseUrl}${path}`, {
        ...options,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...(options.body !== undefined ? { "Content-Type": "application/json" } : {}),
          ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
          ...options.headers,
        },
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
      });
      const body = await readResponseBody(response);
      if (!response.ok) {
        const message = typeof body === "string" ? body : `The server could not complete this request (${response.status}).`;
        throw new ApiError(message, response.status, body, "http");
      }
      return body as T;
    } catch (error) {
      latestError = error;
      if (error instanceof ApiError || externalSignal?.aborted) throw error;
      if (attempt === attempts - 1) {
        const isTimeout = controller.signal.aborted;
        throw new ApiError(isTimeout ? "The server took too long to respond." : "Unable to reach the server. Check the address and connection.", undefined, error, isTimeout ? "timeout" : "network");
      }
    } finally {
      window.clearTimeout(timeout);
      externalSignal?.removeEventListener("abort", abortExternal);
    }
  }

  throw latestError instanceof Error ? latestError : new ApiError("Unable to reach the server.");
}