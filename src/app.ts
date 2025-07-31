import express from "express";
import routes from "@/routes";
import { errorHandler } from "@/middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "@/config/swagger";
import "@/config/sqlite";
import { requestLogger } from "./middlewares/requestLogger";

const app = express();

// 1. Middleware para logar requisições (antes de tudo)
app.use(requestLogger);

// 2. Middleware para parsear JSON do corpo
app.use(express.json());

// 3. Rotas da aplicação
routes(app);

// 4. Documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 5. Middleware de tratamento de erros (último SEMPRE)
app.use(errorHandler);

export default app;
