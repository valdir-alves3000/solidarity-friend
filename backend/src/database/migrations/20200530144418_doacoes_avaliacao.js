
exports.up = function(knex) {
  return knex.schema.createTable('doacoes_avaliacao', function(table) {
    table.string('id').notNullable();    
    table.string('date').notNullable();
    table.string('value').notNullable();
    table.string('description').notNullable();
    table.string('doador').notNullable();

    table.string('ong_id').notNullable();
  }) 
};

exports.down = function(knex) {
  return knex.schema.dropTable('doacoes_avaliacao');
};
