import { Request, Response, NextFunction } from "express";
import { AutorService } from "@/services/autorServiceInterface";
import { AppError } from "@/errors/AppError";

export class AutorController {
  constructor(private autorService: AutorService) {}

  listar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const autores = await this.autorService.listar();
      res.json(autores);
    } catch (error: unknown) {
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

  criar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nome } = req.body;

      if (!nome) {
        throw new AppError(400, "Nome é obrigatório.");
      }

      const id = await this.autorService.criar(nome);
      res.status(201).json({ id, nome });
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
      await this.autorService.deletar(id);
      res.json({ mensagem: "Autor deletado com sucesso." });
    } catch (error: unknown) {
      next(error);
    }
  };
}
