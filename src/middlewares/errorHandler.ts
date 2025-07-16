import { Request, Response, NextFunction } from "express";
import { AppError } from "@/errors/AppError";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  console.error("Erro:", err);

  // Verifica se o erro é uma instância da sua classe personalizada
  if (err instanceof AppError) {
    return res
      .status(err.status)
      .type("application/json")
      .json({ erro: err.message });
  }

  // Se for um erro genérico do JS
  if (err instanceof Error) {
    return res.status(500).type("application/json").json({ erro: err.message });
  }

  // Fallback se o erro não tiver formato conhecido
  return res
    .status(500)
    .type("application/json")
    .json({ erro: "Erro interno no servidor." });
}
