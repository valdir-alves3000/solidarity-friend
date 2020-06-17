exports.up = function(knex) {
  return knex.schema.createTable('instituicao', function (table) {
    table.string('cnpj').notNullable();    
    table.string('name').notNullable();
    table.string('phone').notNullable();
    table.string('email').notNullable();
    table.string('city').notNullable();
    table.string('endereco').notNullable();
    table.string('uf').notNullable();    
    table.string('necessidade').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('instituicao');
};
