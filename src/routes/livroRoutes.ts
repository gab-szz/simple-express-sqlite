import { Router } from "express";
import { LivroRepository } from "@/repositories/livroRepository";
import { LivroServiceImpl } from "@/services/livroService";
import { LivroController } from "@/controllers/livroController";

// Injeção manual de dependências
const repo = new LivroRepository();
const service = new LivroServiceImpl(repo);
const controller = new LivroController(service);

const router = Router();

router.get("/", controller.filtrar);
router.get("/:id", controller.buscar);
router.post("/", controller.criar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.deletar);

export default router;
