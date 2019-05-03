const environment = process.env.NODE_ENV || 'development';
//this is where you specify your environment, the default here is development environment
const configuration = require('./knexfile')[environment];
//we're fetching our configuration file from this filepath to connect it to our express app
const database = require('knex')(configuration);

const express = require('express');
//we are importing express here
const app = express();
//we are assigning this app to be an express app
const port = 3000;
app.use(express.json());
//our data will be parsed as JSON

app.listen(port, () => console.log(`App is listening on port ${port}`));
//our app is listening at the specified port

app.get('/api/v1/artists', (request, response) => {
  //we're using the express get method on app at this endpoint
  //the second argument is the callback function that gets fired off when the request is made
  database('artists').select()
  //select the artists table from the database
    .then((artists) => {
      //once that has happened we want to attempt to grab all of the artists from this endpoint
      if (artists.length) {
        //if there are artists we will return them as json with a 200 OK status code
        response.status(200).json(artists)
      } else {
        //if there aren't any artists in the database we will inform the user with a 404 Not Found and a message
        response.status(404).json({
          error: "There currently aren't any artists in the database"
        })
      }
    })
    //if there is a server side error we will catch that error and send a status code of 500 Internal Server Error and we'll send back an error object
    .catch((error) => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/artists/:id', (request, response) => {
  //we're using the express get method again to access an artist by a specific id at this endpoint
  database('artists').where('id', request.params.id).select()
  //in the artists database we want to locate the artist by id that matches the id we send over in our request.params
    .then(artists => {
      if (artists.length) {
        //if that artist exists by the id we will return that to the user with a 200 OK response and the artist as JSON
        response.status(200).json(artists)
      } else {
        //if we cannot find an artist with that id we will send a status code 404 Not Found and a message to the user
        response.status(404).json({
          error: `Could not find an artist with the id ${request.params.id}`
        })
      }
    })
    //if there is a server side error we will catch that error and send a status code of 500 Internal Server Error and we'll send back an error object
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/artists/:id/artworks', (request, response) => {
  //we're using the express get method to access the artworks of a specific artist at this endpoint
  database('artworks').where('artist_id', request.params.id).select()
  //first we need to locate the artworks base on artist id, so we'll select it based on the id that matches the id sent over in the request.params.id
    .then(artworks => {
      //once the matching artworks are identified by id, we will call this .then method to do something on the results
      //if there are are artworks we respond with a status code 200 and the artworks as JSON
      if (artworks.length) {
        response.status(200).json(artworks)
      } else {
        //if there aren't any artworks we will response with status 404 Not Found and an error message to the user
        response.status(404).json({
          error: `Could not find artworks for the artist with id ${request.params.id}`
        })
      }
    })
    //if there is a server side error we will catch that error and send a status code of 500 Internal Server Error and we'll send back an error object
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.post('/api/v1/artists', (request, response) => {
  //we're using an express post method to submit a new artist to the database at this endpoint
  //we declare a variable of artist and assign it the request.body
  const artist = request.body;

  for (let requiredParameter of ['name', 'nationality']) {
    //here we are iterating through the name and nationality on the artist which is an object
    if(!artist[requiredParameter]) {
      //if the artist object does not contain both required parameters in the request.body we will return a response of status 422 Unprocessable entity
      return response 
        .status(422)
        //we also want to send some error messaging indicating the the user that they are missing a required parameter (including the data type)
        .send({ error: `Expected format: { name: <String>, nationality: <String> } You're missing a "${requiredParameter}" property.` })
    }
  }
  // if the request.body was sent over with both required parameters we will proceed with inserting the artist into the database and generate a unique id for it
  database('artists').insert(artist, 'id')
    .then(artist => {
      //once the artist has been inserted and that new id has been generated we will send a response status of 201 Create New Resource and also send back the id to the user as json
      response.status(201).json({ id: artist[0] })
    })
    //if there is a server side error we will respond with a status code 500 Internal Server Error and we'll send back the error object
    .catch(error => {
      response.status(500).json({ error });
    })
})

app.get('/api/v1/artworks', (request, response) => {
  //we will use the express get method to retrieve all of the artworks
  database('artworks').select()
  //we will select the artworks database
    .then((artworks) => {
      //once we selected the artworks database we will see if there are any artworks in the database
      if (artworks.length) {
        //if there are artworks we will response with a response status code 200 OK and the artworks as json
        response.status(200).json(artworks)
      } else {
        //if there aren't any artworks we will response with status 404 Not Found and a json error response to the user that there aren't any artworks
        response.status(404).json({
          error: "There currently aren't any artworks in the database"
        })
      }
    })
    //if there is a server side error we will respond with a status code 500 Internal Server Error and we'll send an error object
    .catch((error) => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/artworks/:id', (request, response) => {
  //we are using the express get method to retrieve a specific artwork by id
  database('artworks').where('id', request.params.id).select()
  //we are selecting the artworks database, specifically where the id of the artwork in the database matches the id sent in the request.params.id
    .then(artworks => {
      //once we have selected the artworks by id we will use our logic here to handle what we've selected
      if (artworks.length) {
        //if there is an artwork there we will respond with status 200 and json response of the artwork
        response.status(200).json(artworks)
      } else {
        //if there is not an artwork found we will respond with status code 404 Not Found and some messaging to the user with JSON
        response.status(404).json({
          error: `Could not find a piece of art that matched id ${request.params.id}`
        })
      }
    })
    //if there is a server side error we will respond with a status code 500 Internal Server Error and we'll send an error object
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.post('/api/v1/artists/:id/artworks', (request, response) => {
  //we are using the express post method to add a piece of artwork for a specific artist
  const artwork = request.body;
  //we are declaring a variable of artwork assigned to the request.body
  const artistId = request.params.id;
  //we are declaring an artistId assigned to the request.params.id in order to identify the correct artist

  for (let requiredParameter of ['title', 'date', 'img_url']) {
    //we are iterating through the title, date and img_url of the artwork to ensure the user has sent over the correct parameters for a successful response
    if(!artwork[requiredParameter]){
      //if the user sent over a request.body without one of the required fields
      //we will respond with a status code 422 unprocessable entity
      //we will also send some messaging to the user that reminds them of the required parameters (and also data types)
      return response
        .status(422)
        .send({ error: `Expected format: { title: <String>, date: <Integer>, img_url: <String> } You're missing a "${requiredParameter}" property.` })
    }
  }
  //if the user sent over a completed request.body with all required parameters we will insert the artwork into the artworks database
  //the field of artist_id will be assigned the corresponding artist id
  //we will also generate a unique id for each artwork as a primary key
  database('artworks').insert({ ...artwork, artist_id: artistId }, 'id')
    .then(artwork => {
      //once we have inserted the artwork we will respond with status code 201 Create new resource and a JSON message that the artwork was successfully added
      response.status(201).json( `You successfully added a new piece of art!` )
    })
    //if there is a server side error we will respond with a status code 500 Internal Server Error and we'll send an error object
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.delete('/api/v1/artworks/:id', (request, response) => {
  //we will use the express delete method in order to delete an artwork by id
  database('artworks').where('id', request.params.id).select().del()
  //in the artworks database we will select the entry whose id matches the id in the request.params.id and we will delete it
    .then(artwork => {
      if (artwork) {
        //if there was an artwork there to delete we will respond with status 200 OK and JSON messaging to the user indicating that the resource was successfully deleted
        response.status(200).json({ message: `The artwork with id ${request.params.id} was successfully deleted.`})
      } else {
        //if there was not a piece of artwork matching that id we will respond with status 404 Not Found and JSON messaging to the user
        response.status(404).json({ error: `We could not find an artwork with id of ${request.params.id} to delete.`})
      }
    })
    //if there is a server side error we will respond with a status code 500 Internal Server Error and we'll send an error object
    .catch(error => {
      response.status(500).json({ error })
    })
})