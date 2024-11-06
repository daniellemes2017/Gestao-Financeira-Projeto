// src/database/seeds/02_transacoes_seed.ts
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  
  await knex("transacoes").del();

  
  await knex("transacoes").insert([
    {
      id: 1,
      descricao: "Salário",
      valor: 3500.0,
      tipo: "receita",
      data: new Date().toISOString().slice(0, 19).replace('T', ' '), 
      id_usuario: 1,
    },
    {
      id: 2,
      descricao: "Aluguel",
      valor: 1000.0,
      tipo: "despesa",
      data: new Date().toISOString().slice(0, 19).replace('T', ' '), 
      id_usuario: 1,
    },
    {
      id: 3,
      descricao: "Freelance Projeto X",
      valor: 500.0,
      tipo: "receita",
      data: new Date().toISOString().slice(0, 19).replace('T', ' '),
      id_usuario: 2,
    },
    {
      id: 4,
      descricao: "Compras Supermercado",
      valor: 300.0,
      tipo: "despesa",
      data: new Date().toISOString().slice(0, 19).replace('T', ' '),
      id_usuario: 2,
    },
  ]);
}