import express from "express";
import routes from "@/routes";
import { errorHandler } from "@/middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "@/config/swagger";
import "@/lib/sqlite/db";

const app = express();

app.use(express.json());

routes(app);

// Serve a documentação na rota /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

export default app;
