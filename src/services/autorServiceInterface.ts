import { IAutor } from "@/types/autor";

export interface IAutorService {
  criar(nome: string): Promise<number>;
  listar(page: number, limit: number): Promise<IAutor[]>;
  filtrar(
    filtro: { nome?: string },
    page: number,
    limit: number
  ): Promise<IAutor[] | null>;
  buscar(id: number): Promise<IAutor | null>;
  atualizar(id: number, nome: string): Promise<void>;
  deletar(id: number): Promise<boolean>;
}
