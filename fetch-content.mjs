import fs from 'fs';

import fetch from 'node-fetch';

const response = await fetch(
  `https://api.themoviedb.org/3/movie/top_rated?api_key=5494c3aa84c3dc8ee3abdbca31b17bd6&language=en-US&page=1`
);
const data = await JSON.stringify(response);

fs.writeFileSync('./data.json', data);

console.log(data);

// api_key=e0add4835a4a4c34f08aeb4c32425f01
