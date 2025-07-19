import { Router } from "express";
import { AutorRepositorySQLite } from "@/repositories/autorRepository";
import { AutorServiceImpl } from "@/services/autorService";
import { AutorController } from "@/controllers/autorController";
import { validateBody } from "@/middlewares/validateBody";
import {
  AutorIdParamSchema,
  AutorQuerySchema,
  CreateAutorSchema,
} from "@/schemas/autor.schema";
import { UpdateAutorSchema } from "@/schemas/autor.schema";
import { validateQuery } from "@/middlewares/validateQuery";
import { validateParams } from "@/middlewares/validateParams";

// Injeção manual de dependências
const repo = new AutorRepositorySQLite();
const service = new AutorServiceImpl(repo);
const controller = new AutorController(service);

const router = Router();

router.get("/", validateQuery(AutorQuerySchema), controller.filtrar);
router.get("/:id", validateParams(AutorIdParamSchema), controller.buscar);
router.post("/", validateBody(CreateAutorSchema), controller.criar);
router.put("/:id", validateBody(UpdateAutorSchema), controller.atualizar);
router.delete("/:id", validateParams(AutorIdParamSchema), controller.deletar);

export default router;
