import { env } from "./env";
import app from "./app";

app.listen(env.PORTA, () => {
  console.log(`Servidor rodando na porta ${env.PORTA}`);
});
