import { IAutor } from "@/types/autor";

export interface AutorRepository {
  criar(autor: IAutor): Promise<number>;
  listarTodos(): Promise<IAutor[]>;
  buscarPorId(id: number): Promise<IAutor | null>;
  atualizar(id: number, autor: IAutor): Promise<void>;
  deletar(id: number): Promise<void>;
}
