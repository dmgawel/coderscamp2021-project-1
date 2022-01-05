import fs from 'fs';

import fetch from 'node-fetch';

let data;
let allData = [];
let pageNumber = 1;
while (pageNumber < 5) {
  pageNumber++;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=5494c3aa84c3dc8ee3abdbca31b17bd6&language=en-US&page=${pageNumber}`
  );
  data = await response.json();
  allData = [...allData, data];
  console.log(allData);
}

// fs.writeFileSync('./data.json', data);
