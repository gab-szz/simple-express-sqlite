import { env } from "./config/env";
import { logger } from "@/utils/logger";
import app from "./app";

app.listen(env.PORTA, () => {
  logger.info({ msg: `Servidor rodando na porta ${env.PORTA}` });
});
