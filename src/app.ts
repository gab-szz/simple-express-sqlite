import express from "express";
import routes from "@/routes";
import { errorHandler } from "@/middlewares/errorHandler";
import "@/lib/sqlite/db"; // 👈 Só importar já executa a conexão e criação das tabelas

const app = express();

app.use(express.json());

routes(app);

app.use(errorHandler);

export default app;
