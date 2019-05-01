const artists = require('../../../artists');

const createArtist = (knex, artist) => {
  return knex('artists').insert({
    name: artist.name,
    nationality: artist.nationality
  }, 'id')
    .then(artistId => {
      let artworkPromises = [];

      artist.artworks.forEach(artwork => {
        artworkPromises.push(
          createArtwork(knex, {
            title: artwork.title,
            date: artwork.date,
            img_url: artist.img_url,
            artist_id: artistId[0]
          })
        )
      });
      return Promise.all(artworkPromises);
    })
}

const createArtwork = (knex, artwork) => {
  return knex('artworks').insert(artwork);
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
