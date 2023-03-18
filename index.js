const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Enable CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// API endpoint that returns a random sci-fi image from ArtStation
app.get('/random-sci-fi-image', (req, res) => {

  fetch("https://www.artstation.com/random_project.json?&medium=3d")
    .then(response => response.json())
    .then(data => {
      const imageUrl = data.assets[0].image_url;
      const title = data.title;
      res.render('index', { imageUrl, title });
    })
    .catch(error => res.status(500).json({ error: error.message }));
});



// API endpoint that returns json data of an image
app.get('/random-sci-fi-image-json', (req, res) => {
    fetch("https://www.artstation.com/random_project.json?&medium=3d") 
    .then(response => response.json())
    .then(data => {
        res.json(data.assets[0]);
       })
    .catch(error => res.status(500).json({ error: error.message }));
  });





// Serve the HTML page with injected data
app.set('views', './views');
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index', { imageUrl: '', title: '' });
});

// Start the server
app.listen(3001, () => console.log('Server listening on port 3001'));




// const express = require('express');
// const fetch = require('node-fetch');
// const app = express();

// // Enable CORS middleware
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

// // API endpoint that returns a random sci-fi image from ArtStation
// app.get('/random-sci-fi-image', (req, res) => {

//   fetch("https://www.artstation.com/random_project.json?&adult_content=true&hide_as_adult=false")
//     .then(response => response.json())
//     .then(data => {
//      console.log(data.assets[0].image_url)
//     })
//     .catch(error => res.status(500).json({ error: error.message }));
// });

// // Start the server
// app.listen(3000, () => console.log('Server listening on port 3000'));
