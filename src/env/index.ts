import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["DESENVOLVIMENTO", "PRODUCAO", "TESTE"]),
  PORTA: z.coerce.number().default(3000),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Variáveis de Ambiente inválidas", _env.error.format());
  throw new Error("Variáveis de Ambiente inválidas");
}

export const env = _env.data;
