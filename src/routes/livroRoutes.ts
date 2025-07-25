// src/routes/livro.routes.ts
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
 * tags:
 *   name: Livros
 *   description: Endpoints para gerenciamento de livros
 */

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros com filtros opcionais
 *     tags: [Livros]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Filtrar por parte do título do livro
 *       - in: query
 *         name: autor_id
 *         schema:
 *           type: integer
 *         description: Filtrar por ID do autor
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Página de resultados
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Itens por página
 *     responses:
 *       200:
 *         description: Lista de livros filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Livro'
 *       400:
 *         description: Parâmetros de consulta inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", validateQuery(LivroQuerySchema), controller.filtrar);

/**
 * @swagger
 * /livros/{id}:
 *   get:
 *     summary: Busca um livro pelo ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Livro não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", validateParams(LivroIdParamSchema), controller.buscar);

/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Livros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLivro'
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 titulo:
 *                   type: string
 *                   example: "O Senhor dos Anéis"
 *                 autor_id:
 *                   type: integer
 *                   example: 42
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", validateBody(CreateLivroSchema), controller.criar);

/**
 * @swagger
 * /livros/{id}:
 *   put:
 *     summary: Atualiza um livro existente
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateLivro'
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Livro atualizado com sucesso."
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Livro não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", validateBody(UpdateLivroSchema), controller.atualizar);

/**
 * @swagger
 * /livros/{id}:
 *   delete:
 *     summary: Remove um livro pelo ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro a ser deletado
 *     responses:
 *       200:
 *         description: Livro deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Livro deletado com sucesso."
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Livro não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", validateParams(LivroIdParamSchema), controller.deletar);

/**
 * @swagger
 * components:
 *   schemas:
 *     Livro:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         titulo:
 *           type: string
 *           example: "O Senhor dos Anéis"
 *         autor_id:
 *           type: integer
 *           example: 42
 *     CreateLivro:
 *       type: object
 *       required:
 *         - titulo
 *         - autor_id
 *       properties:
 *         titulo:
 *           type: string
 *           example: "O Senhor dos Anéis"
 *         autor_id:
 *           type: integer
 *           example: 42
 *     UpdateLivro:
 *       type: object
 *       required:
 *         - titulo
 *         - autor_id
 *       properties:
 *         titulo:
 *           type: string
 *           example: "O Hobbit"
 *         autor_id:
 *           type: integer
 *           example: 42
 *     Error:
 *       type: object
 *       properties:
 *         erro:
 *           type: string
 *           example: "Mensagem de erro descrevendo o problema."
 */

export default router;
