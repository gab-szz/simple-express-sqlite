// src/routes/autor.routes.ts
import { Router } from "express";
import { AutorRepositorySQLite } from "@/repositories/autorRepository";
import { AutorServiceImpl } from "@/services/autorService";
import { AutorController } from "@/controllers/autorController";
import { validateBody } from "@/middlewares/validateBody";
import {
  AutorIdParamSchema,
  AutorQuerySchema,
  CreateAutorSchema,
  UpdateAutorSchema,
} from "@/schemas/autor.schema";
import { validateQuery } from "@/middlewares/validateQuery";
import { validateParams } from "@/middlewares/validateParams";

const repo = new AutorRepositorySQLite();
const service = new AutorServiceImpl(repo);
const controller = new AutorController(service);

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autores
 *   description: Endpoints para gerenciamento de autores
 */

/**
 * @swagger
 * /autores:
 *   get:
 *     summary: Lista autores com filtros opcionais
 *     tags: [Autores]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Filtrar por parte do nome do autor
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
 *         description: Lista de autores filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Autor'
 *       400:
 *         description: Parâmetros de consulta inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", validateQuery(AutorQuerySchema), controller.filtrar);

/**
 * @swagger
 * /autores/{id}:
 *   get:
 *     summary: Busca um autor pelo ID
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do autor
 *     responses:
 *       200:
 *         description: Autor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Autor'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Autor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", validateParams(AutorIdParamSchema), controller.buscar);

/**
 * @swagger
 * /autores:
 *   post:
 *     summary: Cria um novo autor
 *     tags: [Autores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAutor'
 *     responses:
 *       201:
 *         description: Autor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: Gabriel
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", validateBody(CreateAutorSchema), controller.criar);

/**
 * @swagger
 * /autores/{id}:
 *   put:
 *     summary: Atualiza um autor existente
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do autor a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAutor'
 *     responses:
 *       200:
 *         description: Autor atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Autor atualizado com sucesso.
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Autor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", validateBody(UpdateAutorSchema), controller.atualizar);

/**
 * @swagger
 * /autores/{id}:
 *   delete:
 *     summary: Remove um autor pelo ID
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do autor a ser deletado
 *     responses:
 *       200:
 *         description: Autor deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Autor deletado com sucesso.
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Autor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", validateParams(AutorIdParamSchema), controller.deletar);

/**
 * @swagger
 * components:
 *   schemas:
 *     Autor:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: Gabriel
 *     CreateAutor:
 *       type: object
 *       required:
 *         - nome
 *       properties:
 *         nome:
 *           type: string
 *           example: Gabriel
 *     UpdateAutor:
 *       type: object
 *       required:
 *         - nome
 *       properties:
 *         nome:
 *           type: string
 *           example: Gabriel
 *     Error:
 *       type: object
 *       properties:
 *         erro:
 *           type: string
 *           example: Mensagem de erro descrevendo o problema.
 */

export default router;
