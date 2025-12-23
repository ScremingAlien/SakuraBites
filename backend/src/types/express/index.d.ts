import "express";

declare module "express-serve-static-core" {
  interface Response {
    success: (message?: string | null, data?: unknown, statusCode?: number) => void;

    fail: (message?: string | null, statusCode?: number, extras?: Record<string, unknown>) => void;
  }

  interface Request {
    validated?: unknown;
  }
}
