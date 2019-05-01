exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('artists').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('artists').insert({
          name: 'Fernando Botero', nationality: 'Colombian'
        })
        .then(() => console.log('Seeding successful!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
      // return knex('table_name').insert([
      //   {id: 1, colName: 'rowValue1'},
      //   {id: 2, colName: 'rowValue2'},
      //   {id: 3, colName: 'rowValue3'}
      // ]);
    });
};
