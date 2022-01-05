import fs from 'fs';
import fetch from 'node-fetch';

let movieNames = [];

let pageNumber = 1;
while (pageNumber < 10) {
  pageNumber++;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=5494c3aa84c3dc8ee3abdbca31b17bd6&language=en-US&page=${pageNumber}`
  );
  const data = await response.json();
  const names = data.results.map((movie) => movie.title);
  movieNames = movieNames.concat(names);
}

// Filter out long titles
movieNames = movieNames.filter((name) => name.length < 30);

// Save to file
fs.writeFileSync('./src/data/movieNames.json', JSON.stringify(movieNames));