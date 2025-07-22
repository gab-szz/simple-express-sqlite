import { ILivro } from "@/types/livro";

export interface ILivroService {
  criar(titulo: string, autor_id: number): Promise<number>;
  filtrar(
    filtro: { titulo?: string; autor_id?: number },
    page?: number,
    limit?: number
  ): Promise<ILivro[]>;
  buscar(id: number): Promise<ILivro | null>;
  atualizar(livro: ILivro): Promise<boolean>;
  deletar(id: number): Promise<boolean>;
}
