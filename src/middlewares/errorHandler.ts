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

  // Tratamento de erros do SQLite
  if (err instanceof Error && "code" in err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sqliteError = err as any;

    if (sqliteError.code === "SQLITE_CONSTRAINT") {
      return res.status(400).json({
        erro: "Dados inválidos. Verifique se todos os campos obrigatórios foram preenchidos corretamente.",
      });
    }
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
