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
      response.status(200).json(artists)
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
          error: `Could not find artist with id ${request.params.id}`
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
      response.status(201).json( `You successfully added a piece of art!` )
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
        .send({ error: `Expected format: { name: <String>, author: <String> } You're missing a "${requiredParameter}" property.` })
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
      response.status(200).json(artworks)
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