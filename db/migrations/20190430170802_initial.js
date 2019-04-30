exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('artists', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('nationality');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('artworks', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.integer('artist_id').unsigned();
      table.integer('date');
      table.string('img_url');
      table.foreign('artist_id')
        .references('artists.id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('artists'),
    knex.schema.dropTable('artworks')
  ]);
};
