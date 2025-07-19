import { z } from "zod";

export const CreateAutorSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
});

export const AutorIdParamSchema = z.object({
  id: z.coerce.number().int().positive("ID deve ser um número positivo"),
});

export const AutorQuerySchema = z.object({
  nome: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
});

export const UpdateAutorSchema = z.object({
  nome: z.string().min(1).optional(),
});

export type CreateAutorDTO = z.infer<typeof CreateAutorSchema>;
export type UpdateAutorDTO = z.infer<typeof UpdateAutorSchema>;
