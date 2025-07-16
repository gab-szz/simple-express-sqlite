import { Router } from "express";
import { AutorRepositorySQLite } from "@/repositories/autorRepository";
import { AutorServiceImpl } from "@/services/autorService";
import { AutorController } from "@/controllers/autorController";

// Injeção manual de dependências
const repo = new AutorRepositorySQLite();
const service = new AutorServiceImpl(repo);
const controller = new AutorController(service);

const router = Router();

router.get("/", controller.listar);
router.get("/:id", controller.buscar);
router.post("/", controller.criar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.deletar);

export default router;
