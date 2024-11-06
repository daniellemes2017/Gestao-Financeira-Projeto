// src/database/seeds/01_usuarios_seed.ts
import { Knex } from "knex";
import bcrypt  from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
  
  await knex("usuarios").del();

  
  const hashedPassword1 = await bcrypt.hash("senha135", 10);
  const hashedPassword2 = await bcrypt.hash("senha246", 10);

  await knex("usuarios").insert([
    {
      id: 1,
      nome: "Admin",
      email: "admin@example.com",
      senha: hashedPassword1,
    },
    {
      id: 2,
      nome: "Usuário Teste",
      email: "teste@example.com",
      senha: hashedPassword2,
    },
  ]);
}
