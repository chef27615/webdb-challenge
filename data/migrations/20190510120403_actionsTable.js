

exports.up = function(knex, Promise) {
    return knex.schema.createTable('actions', tbl => {
        tbl.increments();
        
        tbl
        .string('description', 128)
        .notNullable()
        
        tbl
        .string('notes', 256)
        .notNullable()
  
        tbl
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
  
        tbl
        .boolean('complete')
        .notNullable()
        .defaultTo(false)
  
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('actions');
  };
