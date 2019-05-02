# BuildYourOwnBackend


## ARTISTS

## GET `/api/v1/artists`

#### Response
#### Status: 200 OK
#### Link: `http://localhost:3000/api/v1/artists`
```
[
    {
        "id": 1,
        "name": "Paul Gauguin",
        "nationality": "French",
        "created_at": "2019-05-01T17:44:51.930Z",
        "updated_at": "2019-05-01T17:44:51.930Z"
    },
    {
        "id": 2,
        "name": "Edgar Degas",
        "nationality": "French",
        "created_at": "2019-05-01T17:44:51.937Z",
        "updated_at": "2019-05-01T17:44:51.937Z"
    },
    {
        "id": 3,
        "name": "Paul Cézanne",
        "nationality": "French",
        "created_at": "2019-05-01T17:44:51.937Z",
        "updated_at": "2019-05-01T17:44:51.937Z"
    }
]
```

## GET `/api/v1/artists/:id`

#### Response
#### Status: 200 OK
#### Link: `http://localhost:3000/api/v1/artists/10`
```
[
    {
        "id": 10,
        "name": "Henri Rousseau",
        "nationality": "French",
        "created_at": "2019-05-01T17:44:51.945Z",
        "updated_at": "2019-05-01T17:44:51.945Z"
    }
]
```

#### Status: 404 NOT FOUND
#### Link: `http://localhost:3000/api/v1/artists/9999`
```
{
    "error": "Could not find an artist with the id 9999"
}
```

## GET `/api/v1/artists/:id/artworks`

#### Response
#### Status: 200 OK
#### Link: `http://localhost:3000/api/v1/artists/10/artworks`
```
[
    {
        "id": 28,
        "title": "The Dream",
        "artist_id": 10,
        "date": 1910,
        "img_url": null,
        "created_at": "2019-05-01T17:44:51.966Z",
        "updated_at": "2019-05-01T17:44:51.966Z"
    },
    {
        "id": 29,
        "title": "Carnival Evening",
        "artist_id": 10,
        "date": 1886,
        "img_url": null,
        "created_at": "2019-05-01T17:44:51.966Z",
        "updated_at": "2019-05-01T17:44:51.966Z"
    },
    {
        "id": 30,
        "title": "The Hungry Lion Attacking An Antelope",
        "artist_id": 10,
        "date": 1905,
        "img_url": null,
        "created_at": "2019-05-01T17:44:51.967Z",
        "updated_at": "2019-05-01T17:44:51.967Z"
    },
    {
        "id": 31,
        "title": "Exotic Landscape",
        "artist_id": 10,
        "date": 1908,
        "img_url": "https://s23932.pcdn.co/wp-content/uploads/importedmedia/Henri_Rousseau_-_Exotic_Landscape-painting-animals_artist-daily.jpg",
        "created_at": "2019-05-02T03:48:59.462Z",
        "updated_at": "2019-05-02T03:48:59.462Z"
    }
  ]
  ```
  
  #### Status: 404 NOT FOUND
  #### Link: `http://localhost:3000/api/v1/artists/9999/artworks`
  
```
  {
    "error": "Could not find artworks for the artist with id 9999"
  }
```

## POST `/api/v1/artists`

#### Required Parameters 

| Name| Type| Description|
| --- | --- | --- |
| `name` | `string` | `the artists's name` |
| `nationality` | `string` | `the artists's nationality` |

#### Example:
` { "name": "Frida Kahlo", "nationality":"Mexican" } `

#### Response
#### Status 201 Created
#### Link: `http://localhost:3000/api/v1/artists`

``` 
{
    "id": 12
}
```

#### Response
#### Status 422 Unprocessable Entity
#### Link: `http://localhost:3000/api/v1/artists`
#### Example: 
` { "name": "Georgia O'Keefe", "nationality":"" } `

``` 
{
    "error": "Expected format: { name: <String>, nationality: <String> } You're missing a \"nationality\" property."
}
```

## ARTWORKS

## GET `/api/v1/artworks`

#### Response
#### Status: 200 OK
#### Link: `http://localhost:3000/api/v1/artworks`
```
[
    {
        "id": 1,
        "title": "Arearea",
        "artist_id": 1,
        "date": 1892,
        "img_url": null,
        "created_at": "2019-05-01T17:44:51.947Z",
        "updated_at": "2019-05-01T17:44:51.947Z"
    },
    {
        "id": 2,
        "title": "Nave Nave Mahana",
        "artist_id": 1,
        "date": 1896,
        "img_url": null,
        "created_at": "2019-05-01T17:44:51.948Z",
        "updated_at": "2019-05-01T17:44:51.948Z"
    },
    {
        "id": 3,
        "title": "Merahi metua no Tehamana",
        "artist_id": 1,
        "date": 1893,
        "img_url": null,
        "created_at": "2019-05-01T17:44:51.948Z",
        "updated_at": "2019-05-01T17:44:51.948Z"
    }
]
```

## GET `/api/v1/artworks/:id`

#### Response
#### Status: 200 OK
#### Link: `http://localhost:3000/api/v1/artworks/28`

```
[
    {
        "id": 28,
        "title": "The Dream",
        "artist_id": 10,
        "date": 1910,
        "img_url": null,
        "created_at": "2019-05-01T17:44:51.966Z",
        "updated_at": "2019-05-01T17:44:51.966Z"
    }
]
```

#### Response
#### Status: 404 NOT FOUND
#### Link: `http://localhost:3000/api/v1/artworks/9999`

```
{
    "error": "Could not find a piece of art that matched id 9999"
}
```

## POST `/api/v1/artists/:id/artworks`

#### Required Parameters 

| Name| Type| Description|
| --- | --- | --- |
| `title` | `string` | `the title of the artwork` |
| `date` | `integer` | `the year the artwork was completed` |
| `img_url` | `string` | `an image URL for the artwork` |


#### Example:
` { "title": "Twee vrouwen aan het strand", "date": 1898 , "img_url": "http://paintingandframe.com/uploadpic/edvard_munch/big/twee_vrouwen_aan_het_strand.jpg" } `

#### Response
#### Status: 201 Created
#### Link: `http://localhost:3000/api/v1/artists/4/artworks`

`"You successfully added a new piece of art!"`

#### Response
#### Status: 422 Unprocessable Entity
#### Link: `http://localhost:3000/api/v1/artists/4/artworks`

#### Example:
`{ "title": "Twee vrouwen aan het strand", "date": 1898 , "img_url": "" }`

```
{
    "error": "Expected format: { title: <String>, date: <Integer>, img_url: <String> } You're missing a \"img_url\" property."
}
```

## DELETE `/api/v1/artworks/:id`

#### Response
#### Status: 200 OK
#### Link: `http://localhost:3000/api/v1/artists/4/artworks`

```
{
    "message": "The artwork with id 30 was successfully deleted."
}
```

#### Response
#### Status: 404 Not Found
#### Link: `http://localhost:3000/api/v1/artworks/9999`

```
{
    "error": "We could not find an artwork with id of 9999 to delete."
}
```

