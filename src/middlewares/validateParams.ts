// src/middlewares/validateParams.ts
import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "@/errors/AppError";

export const validateParams = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      const mensagemFinal = result.error.issues
        .map((error) => error.message)
        .join(", ");
      throw new AppError(400, mensagemFinal);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).validatedParams = result.data;
    next();
  };
};
