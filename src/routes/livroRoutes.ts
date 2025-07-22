import { Router } from "express";
import { LivroRepositorySQLite } from "@/repositories/livroRepository";
import { LivroServiceImpl } from "@/services/livroService";
import { LivroController } from "@/controllers/livroController";
import { validateQuery } from "@/middlewares/validateQuery";
import {
  CreateLivroSchema,
  LivroIdParamSchema,
  LivroQuerySchema,
  UpdateLivroSchema,
} from "@/schemas/livro.schema";
import { validateBody } from "@/middlewares/validateBody";
import { validateParams } from "@/middlewares/validateParams";

// Injeção manual de dependências
const repo = new LivroRepositorySQLite();
const service = new LivroServiceImpl(repo);
const controller = new LivroController(service);

const router = Router();

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Livro'
 */
router.get("/", validateQuery(LivroQuerySchema), controller.filtrar);
router.get("/:id", validateParams(LivroIdParamSchema), controller.buscar);
router.post("/", validateBody(CreateLivroSchema), controller.criar);
router.put("/:id", validateBody(UpdateLivroSchema), controller.atualizar);
router.delete("/:id", validateParams(LivroIdParamSchema), controller.deletar);

export default router;
