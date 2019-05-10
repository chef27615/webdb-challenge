
exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', tbl => {
      tbl.increments();
    
      tbl
      .string('name', 128)
      .notNullable()
      .unique()
      
      tbl
      .string('description', 256)
      .notNullable()
      
      tbl
      .boolean('complete')
      .notNullable()
      .defaultTo(false)
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('projectsTable');
};
