import fs from 'fs';
import fetch from 'node-fetch';

// Movie names from DB
let movieNames = [];

let moviesPageNumber = 1;
while (moviesPageNumber < 10) {
  moviesPageNumber++;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=5494c3aa84c3dc8ee3abdbca31b17bd6&language=en-US&page=${moviesPageNumber}`
  );
  const data = await response.json();
  const names = data.results.map((movie) => movie.title);
  movieNames = movieNames.concat(names);
}

// Filter out long titles
movieNames = movieNames.filter((name) => name.length < 30);

// Save to file
fs.writeFileSync('./src/data/movieNames.json', JSON.stringify(movieNames));

//
// Actors names from DB
let actorsNames = [];

let actorsPageNumber = 1;
while (actorsPageNumber < 10) {
  actorsPageNumber++;
  const response = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=5494c3aa84c3dc8ee3abdbca31b17bd6&language=en-US&page=${actorsPageNumber}`
  );
  const data = await response.json();
  const names = data.results.map((actor) => actor.name);
  actorsNames = actorsNames.concat(names);
}

actorsNames = actorsNames.filter((name) => name.length < 30);

// Save to file
fs.writeFileSync('./src/data/actorsNames.json', JSON.stringify(actorsNames));
