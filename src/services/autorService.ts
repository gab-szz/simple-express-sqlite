import { AutorRepository } from "@/repositories/autorRepositoryInterface";
import { AutorService } from "./autorServiceInterface";
import { IAutor } from "@/types/autor";

export class AutorServiceImpl implements AutorService {
  constructor(private autorRepository: AutorRepository) {}

  async criar(nome: string): Promise<number> {
    const autor: IAutor = { nome };
    return await this.autorRepository.criar(autor);
  }

  async listar(): Promise<IAutor[]> {
    return await this.autorRepository.listarTodos();
  }

  async buscar(id: number): Promise<IAutor | null> {
    return await this.autorRepository.buscarPorId(id);
  }

  async atualizar(id: number, nome: string): Promise<void> {
    const autor: IAutor = { nome };
    return await this.autorRepository.atualizar(id, autor);
  }

  async deletar(id: number): Promise<void> {
    return await this.autorRepository.deletar(id);
  }
}
