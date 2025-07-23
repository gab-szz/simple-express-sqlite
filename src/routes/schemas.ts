// src/schemas/autor.schema.ts
import { z } from "zod";

/**
 * Valida e converte o parâmetro de rota {id} para número.
 */
export const AutorIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID inválido")
    .transform((val) => Number(val)),
});

/**
 * Query string opcional para filtrar listagem.
 */
export const AutorQuerySchema = z
  .object({
    nome: z.string().optional(),
    page: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : undefined))
      .refine(
        (num) => num === undefined || (Number.isInteger(num) && num > 0),
        { message: "Página deve ser inteiro positivo" }
      ),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : undefined))
      .refine(
        (num) => num === undefined || (Number.isInteger(num) && num > 0),
        { message: "Limit deve ser inteiro positivo" }
      ),
  })
  .strict();

/**
 * Body para criação de autor.
 */
export const CreateAutorSchema = z
  .object({
    nome: z.string().min(1, "Nome é obrigatório"),
  })
  .strict();

/**
 * Body para atualização de autor.
 */
export const UpdateAutorSchema = z
  .object({
    nome: z.string().min(1, "Nome é obrigatório"),
  })
  .strict();
