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