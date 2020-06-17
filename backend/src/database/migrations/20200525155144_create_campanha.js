exports.up = function(knex) {
  return knex.schema.createTable('campanhas', function (table) {
    table.increments();    
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('value').notNullable();

    table.string('dateInicio').notNullable();
    table.string('dateFim').notNullable();

    table.string('ong_id').notNullable();
    table.foreign('ong_id').references('id').inTable('ongs');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('campanhas');
};
