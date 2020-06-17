
exports.up = function(knex) {
  return knex.schema.createTable('cadItensDoados', function (table) {
    table.increments();
    
    table.string('quantidade').notNullable();
    table.string('description').notNullable();
    table.string('unidade').notNullable();
    table.decimal('custo').notNullable();

    table.string('date').notNullable();
        
    table.string('ong_id').notNullable();
    table.foreign('ong_id').references('id').inTable('ongs');

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cadItensDoados');
};
