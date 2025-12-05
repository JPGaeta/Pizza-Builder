import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

type ValidationSource = "body" | "query" | "params";

export const validate = (
  schema: ZodObject,
  source: ValidationSource = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const errors = result.error.issues.map((e) => ({
        field: e.path.join(".") || source,
        message: e.message,
      }));
      return res.status(400).json({ errors });
    }

    next();
  };
};
