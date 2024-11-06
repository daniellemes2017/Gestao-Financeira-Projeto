/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('transacoes', (table) => {
      table.increments('id').primary(); // ID da transação
      table.string('tipo').notNullable(); // Tipo da transação: 'receita' ou 'despesa'
      table.decimal('valor', 10, 2).notNullable(); // Valor da transação
      table.string('descricao').notNullable(); // Descrição da transação
      table.date('data').notNullable(); // Data da transação
      table.integer('id_usuario').unsigned().notNullable().references('id').inTable('usuarios').onDelete('CASCADE'); // Relacionamento com a tabela de usuários
      table.timestamps(true, true); // Colunas de created_at e updated_at
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('transacoes'); // Para desfazer a migração
  };
  
