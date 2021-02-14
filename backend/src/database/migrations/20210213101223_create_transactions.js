
exports.up = function(knex) {
  return knex.schema.createTable('transactions', function(table) {
    table.string('id').notNullable();  
    table.string('description').notNullable();
    table.string('amount').notNullable();
    table.string('date').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
};
