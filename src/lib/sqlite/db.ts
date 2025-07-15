import sqlite3 from "sqlite3";

// Habilita modo verbose para debug
sqlite3.verbose();

// Cria a conexão (ou cria o banco se não existir)
export const db = new sqlite3.Database("banco.sqlite", (err) => {
  if (err) {
    console.error("Erro ao conectar no SQLite:", err.message);
  } else {
    console.log("Conectado ao banco SQLite.");
    criarTabelas(); // 👈 chama a função após conectar
  }
});

// Função que cria as tabelas se não existirem
function criarTabelas() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS autores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS livros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        autor_id INTEGER,
        FOREIGN KEY (autor_id) REFERENCES autores(id)
      )
    `);

    console.log("Tabelas verificadas/criadas.");
  });
}
