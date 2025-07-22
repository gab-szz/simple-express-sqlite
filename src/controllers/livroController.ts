import { Request, Response, NextFunction } from "express";
import { ILivroService } from "@/services/livroServiceInterface";
import { AppError } from "@/errors/AppError";
import { ILivro } from "@/types/livro";
import { LivroQuerySchema } from "@/schemas/livro.schema";

export class LivroController {
  constructor(private livroService: ILivroService) {}

  listar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const livros = await this.livroService.filtrar({}, 1, 9999);
      res.json(livros);
    } catch (error) {
      next(error);
    }
  };

  filtrar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = LivroQuerySchema.parse(req.query);
      const { nome, autor_id, page = 1, limit = 10 } = query;

      const resultado = await this.livroService.filtrar(
        { titulo: nome, autor_id },
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

      const livro: ILivro = { id, titulo, autor_id };
      const resultado = await this.livroService.atualizar(livro);

      if (!resultado) {
        throw new AppError(404, "Livro não encontrado.");
      }

      res.json({ mensagem: "Livro atualizado com sucesso." });
    } catch (error) {
      next(error);
    }
  };

  deletar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const sucesso = await this.livroService.deletar(id);

      if (!sucesso) {
        throw new AppError(404, "Livro não encontrado.");
      }

      res.json({ mensagem: "Livro deletado com sucesso." });
    } catch (error) {
      next(error);
    }
  };
}
