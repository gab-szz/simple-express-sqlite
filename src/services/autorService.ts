import { IAutorRepository } from "@/repositories/autorRepositoryInterface";
import { IAutorService } from "./autorServiceInterface";
import { IAutor } from "@/types/autor";

export class AutorServiceImpl implements IAutorService {
  constructor(private autorRepository: IAutorRepository) {}

  async criar(nome: string): Promise<number> {
    const autor: IAutor = { nome };
    return await this.autorRepository.criar(autor);
  }

  filtrar(filtro: { nome?: string }, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    return this.autorRepository.filtrar(filtro, limit, offset);
  }

  async listar(page: number, limit: number): Promise<IAutor[]> {
    const offset = (page - 1) * limit;
    return await this.autorRepository.listarTodos(limit, offset);
  }

  async buscar(id: number): Promise<IAutor | null> {
    return await this.autorRepository.buscarPorId(id);
  }

  async atualizar(id: number, nome: string): Promise<boolean> {
    const autor: IAutor = { nome };
    return await this.autorRepository.atualizar(id, autor);
  }

  async deletar(id: number): Promise<boolean> {
    return await this.autorRepository.deletar(id);
  }
}
