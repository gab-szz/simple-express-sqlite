import express from "express";
import routes from "@/routes";
import "@/lib/sqlite/db"; // 👈 Só importar já executa a conexão e criação das tabelas

const app = express();

app.use(express.json());

routes(app);

export default app;
