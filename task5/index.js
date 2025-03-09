const express = require("express");
const app = express();

const movies = [
  { id: 1, title: "Inception", rating: 8.8, image: "inception.jpg" },
  { id: 2, title: "The Dark Knight", rating: 9.0, image: "dark_knight.jpg" },
  { id: 3, title: "Interstellar", rating: 8.6, image: "interstellar.jpg" }
];

app.get("/movie/:movieName", (req, res) => {
  const movieName = req.params.movieName.toLowerCase();
  let foundMovie = null;

  for (let i = 0; i < movies.length; i++) {
    if (movies[i].title.toLowerCase() === movieName) {
      foundMovie = movies[i];
      break;
    }
  }

  if (foundMovie) {
    res.send(foundMovie);
  } else {
    res.status(404).send({ error: "Movie not found" });
  }
});

app.get("/movie/:movieName/best", (req, res) => {
  let bestMovie = movies[0];

  for (let i = 1; i < movies.length; i++) {
    if (movies[i].rating > bestMovie.rating) {
      bestMovie = movies[i];
    }
  }

  res.send(bestMovie);
});

const PORT = 3000;
app.listen(PORT, () => 
    console.log("Server running on port " + PORT));
