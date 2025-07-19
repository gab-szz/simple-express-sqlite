// src/middlewares/validateBody.ts
import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "@/errors/AppError";

export const validateBody = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.body || typeof req.body !== "object") {
      throw new AppError(400, "Corpo da requisição ausente ou inválido.");
    }

    const result = schema.safeParse(req.body);

    if (!result.success) {
      const mensagemFinal = result.error.issues
        .map((error) => error.message)
        .join(", ");
      throw new AppError(400, mensagemFinal);
    }

    req.body = result.data;
    next();
  };
};
