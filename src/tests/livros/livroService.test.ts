import { describe, it, expect, vi, beforeEach } from "vitest";
import { LivroServiceImpl } from "@/services/livroService";
import { ILivroRepository } from "@/repositories/livroRepositoryInterface";
import { ILivro } from "@/types/livro";

// Mock do repositório, implementando a interface
const fakeRepo = {
  criar: vi.fn<(livro: ILivro) => Promise<number>>(),
  filtrar:
    vi.fn<
      (
        filtro: Partial<ILivro>,
        offset: number,
        limit: number
      ) => Promise<ILivro[]>
    >(),
  buscarPorId: vi.fn<(id: number) => Promise<ILivro | null>>(),
  atualizar: vi.fn<(livro: ILivro) => Promise<boolean>>(),
  deletar: vi.fn<(id: number) => Promise<boolean>>(),
} satisfies ILivroRepository;

let service: LivroServiceImpl;

beforeEach(() => {
  vi.clearAllMocks();
  service = new LivroServiceImpl(fakeRepo);
});

describe("LivroService", () => {
  it("deve criar um livro e retornar o id", async () => {
    fakeRepo.criar.mockResolvedValueOnce(1);
    const id = await service.criar("Livro A", 5);
    expect(id).toBe(1);
    expect(fakeRepo.criar).toHaveBeenCalledWith({
      titulo: "Livro A",
      autor_id: 5,
    });
  });

  it("deve buscar um livro por id existente", async () => {
    const mockLivro: ILivro = { id: 1, titulo: "X", autor_id: 2 };
    fakeRepo.buscarPorId.mockResolvedValueOnce(mockLivro);

    const result = await service.buscar(1);
    expect(result).toEqual(mockLivro);
    expect(fakeRepo.buscarPorId).toHaveBeenCalledWith(1);
  });

  it("deve retornar null ao buscar id inexistente", async () => {
    fakeRepo.buscarPorId.mockResolvedValueOnce(null);
    const result = await service.buscar(999);
    expect(result).toBeNull();
  });

  it("deve filtrar livros com paginação", async () => {
    const mockList: ILivro[] = [
      { id: 1, titulo: "A", autor_id: 5 },
      { id: 2, titulo: "B", autor_id: 5 },
    ];
    fakeRepo.filtrar.mockResolvedValueOnce(mockList);

    const resultado = await service.filtrar(
      { titulo: "A", autor_id: 5 },
      2,
      10
    );
    expect(resultado).toEqual(mockList);
    // offset = (page-1)*limit = (2-1)*10 = 10
    expect(fakeRepo.filtrar).toHaveBeenCalledWith(
      { titulo: "A", autor_id: 5 },
      10,
      10
    );
  });

  it("deve atualizar um livro existente", async () => {
    const livroToUpdate: ILivro = { id: 3, titulo: "C", autor_id: 7 };
    fakeRepo.atualizar.mockResolvedValueOnce(true);

    const success = await service.atualizar(livroToUpdate);
    expect(success).toBe(true);
    expect(fakeRepo.atualizar).toHaveBeenCalledWith(livroToUpdate);
  });

  it("deve retornar false ao atualizar id inexistente", async () => {
    const livroToUpdate: ILivro = { id: 999, titulo: "D", autor_id: 8 };
    fakeRepo.atualizar.mockResolvedValueOnce(false);

    const success = await service.atualizar(livroToUpdate);
    expect(success).toBe(false);
  });

  it("deve deletar um livro existente", async () => {
    fakeRepo.deletar.mockResolvedValueOnce(true);

    const success = await service.deletar(4);
    expect(success).toBe(true);
    expect(fakeRepo.deletar).toHaveBeenCalledWith(4);
  });

  it("deve retornar false ao deletar id inexistente", async () => {
    fakeRepo.deletar.mockResolvedValueOnce(false);
    const success = await service.deletar(999);
    expect(success).toBe(false);
  });
});
