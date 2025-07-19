import { Request, Response, NextFunction } from "express";
import { IAutorService } from "@/services/autorServiceInterface";
import { AppError } from "@/errors/AppError";

export class AutorController {
  constructor(private autorService: IAutorService) {}

  criar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nome } = req.body;

      const id = await this.autorService.criar(nome);
      res.status(201).json({ id, nome });
    } catch (error: unknown) {
      next(error);
    }
  };

  listar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 15;

      const autores = await this.autorService.listar(page, limit);
      res.json(autores);
    } catch (error: unknown) {
      next(error);
    }
  };

  filtrar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nome } = req.query;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const resultado = await this.autorService.filtrar(
        { nome: nome as string },
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
      const autor = await this.autorService.buscar(id);

      if (!autor) {
        throw new AppError(404, "Autor não encontrado.");
      }

      res.json(autor);
    } catch (error: unknown) {
      next(error);
    }
  };

  atualizar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const { nome } = req.body;

      if (!nome) {
        throw new AppError(400, "Nome é obrigatório.");
      }

      await this.autorService.atualizar(id, nome);
      res.json({ mensagem: "Autor atualizado com sucesso." });
    } catch (error: unknown) {
      next(error);
    }
  };

  deletar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const sucesso = await this.autorService.deletar(id);

      if (!sucesso) {
        return res.status(404).json({ mensagem: "Autor não encontrado." });
      }
    } catch (error: unknown) {
      next(error);
    }
  };
}
