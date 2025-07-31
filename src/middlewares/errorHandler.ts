import { Request, Response, NextFunction } from "express";
import { AppError } from "@/errors/AppError";
import { logger } from "@/utils/logger";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  logger.error({
    msg: "Erro capturado pelo middleware",
    path: req.originalUrl,
    method: req.method,
    stack: err instanceof Error ? err.stack : undefined,
    error: err,
  });

  // Erro personalizado
  if (err instanceof AppError) {
    return res
      .status(err.status)
      .type("application/json")
      .json({ erro: err.message });
  }

  // Erro SQLite
  if (err instanceof Error && "code" in err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sqliteError = err as any;

    if (sqliteError.code === "SQLITE_CONSTRAINT") {
      return res.status(400).json({
        erro: "Dados inválidos. Verifique se todos os campos obrigatórios foram preenchidos corretamente.",
      });
    }
  }

  // Erro genérico
  if (err instanceof Error) {
    return res.status(500).type("application/json").json({ erro: err.message });
  }

  // Fallback
  return res
    .status(500)
    .type("application/json")
    .json({ erro: "Erro interno no servidor." });
}
