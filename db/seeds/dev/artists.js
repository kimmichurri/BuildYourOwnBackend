const artists = require('../../../artists');

const createArtist = (knex, artist) => {
  return knex('artists').insert({
    name: artist.name,
    nationality: artist.nationality
  }, 'id')
}

exports.seed = function(knex, Promise) {
  return knex('artists').del()
    .then(function () {
      let artistPromises = [];

      artists.forEach(artist => {
        artistPromises.push(createArtist(knex, artist));
      });
      return Promise.all(artistPromises);
    })
    .then(() => console.log('Seeding successful!'))
    .catch(error => console.log(`Error seeding data: ${error}`))
};
