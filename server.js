const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, () => console.log(`App is listening on port ${port}`));

app.get('/api/v1/artists', (request, response) => {
  database('artists').select()
    .then((artists) => {
      if (artists.length) {
        response.status(200).json(artists)
      } else {
        response.status(404).json({
          error: "There currently aren't any artists in the database"
        })
      }
    })
    .catch((error) => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/artists/:id', (request, response) => {
  database('artists').where('id', request.params.id).select()
    .then(artists => {
      if (artists.length) {
        response.status(200).json(artists)
      } else {
        response.status(404).json({
          error: `Could not find an artist with the id ${request.params.id}`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/artists/:id/artworks', (request, response) => {
  database('artworks').where('artist_id', request.params.id).select()
    .then(artworks => {
      if (artworks.length) {
        response.status(200).json(artworks)
      } else {
        response.status(404).json({
          error: `Could not find artworks for the artist with id ${request.params.id}`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.post('/api/v1/artists', (request, response) => {
  const artist = request.body;

  for (let requiredParameter of ['name', 'nationality']) {
    if(!artist[requiredParameter]) {
      return response 
        .status(422)
        .send({ error: `Expected format: { name: <String>, nationality: <String> } You're missing a "${requiredParameter}" property.` })
    }
  }

  database('artists').insert(artist, 'id')
    .then(artist => {
      response.status(201).json({ id: artist[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    })
})

app.get('/api/v1/artworks', (request, response) => {
  database('artworks').select()
    .then((artworks) => {
      if (artworks.length) {
        response.status(200).json(artworks)
      } else {
        response.status(404).json({
          error: "There currently aren't any artworks in the database"
        })
      }
    })
    .catch((error) => {
      response.status(500).json
    })
})

app.get('/api/v1/artworks/:id', (request, response) => {
  database('artworks').where('id', request.params.id).select()
    .then(artworks => {
      if (artworks.length) {
        response.status(200).json(artworks)
      } else {
        response.status(404).json({
          error: `Could not find a piece of art that matched id ${request.params.id}`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.post('/api/v1/artists/:id/artworks', (request, response) => {
  const artwork = request.body;
  const artistId = request.params.id;

  for (let requiredParameter of ['title', 'date', 'img_url']) {
    if(!artwork[requiredParameter]){
      return response
        .status(422)
        .send({ error: `Expected format: { title: <String>, date: <Integer>, img_url: <String> } You're missing a "${requiredParameter}" property.` })
    }
  }

  database('artworks').insert({ ...artwork, artist_id: artistId }, 'id')
    .then(artwork => {
      response.status(201).json( `You successfully added a new piece of art!` )
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.delete('/api/v1/artworks/:id', (request, response) => {
  database('artworks').where('id', request.params.id).select().del()
    .then(artwork => {
      if (artwork) {
        response.status(200).json({ message: `The artwork with id ${request.params.id} was successfully deleted.`})
      } else {
        response.status(404).json({ error: `We could not find an artwork with id of ${request.params.id} to delete.`})
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})