/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('usuarios', (table) => {
      table.increments('id').primary(); // ID do usuário
      table.string('nome').notNullable(); // Nome do usuário
      table.string('email').notNullable().unique(); // Email do usuário, deve ser único
      table.string('senha').notNullable(); // Senha do usuário, armazenada de forma criptografada
      table.timestamps(true, true); // Colunas de created_at e updated_at
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('usuarios'); // Para desfazer a migração
  };
  

