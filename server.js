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

