import type { Request, Response, NextFunction } from "express";
import type zod from "zod";

export default function validate(schema: zod.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const formatted = result.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return res.fail("Validation failed", 400, { errors: formatted });
    }

    req.validated = result.data;
    next();
  };
}
