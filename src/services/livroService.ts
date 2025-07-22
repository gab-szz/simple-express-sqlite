import { ILivroService } from "./livroServiceInterface";
import { ILivroRepository } from "@/repositories/livroRepositoryInterface";
import { ILivro } from "@/types/livro";

export class LivroServiceImpl implements ILivroService {
  constructor(private livroRepository: ILivroRepository) {}

  async criar(titulo: string, autor_id: number): Promise<number> {
    const livro: ILivro = { titulo, autor_id };
    console.log(livro);
    return await this.livroRepository.criar(livro);
  }

  filtrar(
    filtro: { titulo?: string; autor_id?: number },
    page = 1,
    limit = 10
  ): Promise<ILivro[]> {
    const offset = (page - 1) * limit;
    return this.livroRepository.filtrar(filtro, limit, offset);
  }

  async buscar(id: number): Promise<ILivro | null> {
    return await this.livroRepository.buscarPorId(id);
  }

  async atualizar(livro: ILivro): Promise<boolean> {
    if (!livro.id) {
      throw new Error("ID do livro é obrigatório para atualização.");
    }

    return await this.livroRepository.atualizar(livro);
  }

  async deletar(id: number): Promise<boolean> {
    return await this.livroRepository.deletar(id);
  }
}
