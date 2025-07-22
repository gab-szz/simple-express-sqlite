import { z } from "zod";

export const CreateLivroSchema = z.object({
  titulo: z.string().min(1, "Nome é obrigatório"),
  autor_id: z.number().int().positive("ID deve ser um número positivo"),
});

export const LivroIdParamSchema = z.object({
  id: z.coerce.number().int().positive("ID deve ser um número positivo"),
});

export const LivroQuerySchema = z.object({
  nome: z.string().optional(),
  autor_id: z.number().int().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
});

export const UpdateLivroSchema = z.object({
  titulo: z.string().min(1).optional(),
  autor_id: z.number().int().positive().optional(),
});

export type CreateLivroDTO = z.infer<typeof CreateLivroSchema>;
export type UpdateLivroDTO = z.infer<typeof UpdateLivroSchema>;
