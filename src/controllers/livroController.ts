import { Request, Response, NextFunction } from "express";
import { ILivroService } from "@/services/livroServiceInterface";
import { AppError } from "@/errors/AppError";
import { ILivro } from "@/types/livro";

export class LivroController {
  constructor(private livroService: ILivroService) {}

  listar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const livros = await this.livroService.filtrar({}, 1, 9999); // simula um "listar todos"
      res.json(livros);
    } catch (error) {
      next(error);
    }
  };

  filtrar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { titulo } = req.query;
      const autorId = req.query.autor_id
        ? parseInt(req.query.autor_id as string)
        : undefined;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const resultado = await this.livroService.filtrar(
        { titulo: titulo as string, autor_id: autorId },
        page,
        limit
      );

      res.json(resultado);
    } catch (error) {
      next(error);
    }
  };

  buscar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const livro = await this.livroService.buscar(id);

      if (!livro) {
        throw new AppError(404, "Livro não encontrado.");
      }

      res.json(livro);
    } catch (error) {
      next(error);
    }
  };

  criar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { titulo, autor_id } = req.body;

      if (!titulo || !autor_id) {
        throw new AppError(400, "Título e autor_id são obrigatórios.");
      }

      const id = await this.livroService.criar(titulo, autor_id);
      res.status(201).json({ id, titulo, autor_id });
    } catch (error) {
      next(error);
    }
  };

  atualizar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const { titulo, autor_id } = req.body;

      if (!titulo || !autor_id) {
        throw new AppError(400, "Título e autor_id são obrigatórios.");
      }

      const livro: ILivro = { id, titulo, autor_id };
      await this.livroService.atualizar(livro);

      res.json({ mensagem: "Livro atualizado com sucesso." });
    } catch (error) {
      next(error);
    }
  };

  deletar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.livroService.deletar(id);
      res.json({ mensagem: "Livro deletado com sucesso." });
    } catch (error) {
      next(error);
    }
  };
}
