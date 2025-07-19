// src/middlewares/validateQuery.ts
import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "@/errors/AppError";

export const validateQuery = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      const mensagemFinal = result.error.issues
        .map((error) => error.message)
        .join(", ");
      throw new AppError(400, mensagemFinal);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).validatedQuery = result.data;
    next();
  };
};
