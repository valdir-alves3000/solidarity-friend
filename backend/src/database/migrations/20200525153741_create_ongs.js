exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table) {
    
    table.string('id').notNullable();    
    table.string('name').notNullable();
    table.string('phone').notNullable();
    
    table.string('endereco').notNullable();
    table.string('email').notNullable();
    table.string('city').notNullable();
    table.string('uf').notNullable();
    table.string('password').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
