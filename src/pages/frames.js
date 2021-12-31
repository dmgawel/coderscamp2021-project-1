/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */

import '../../styles/style.css';
import '../../styles/actors.css';
import '../../styles/quizResult.css';
import '../../styles/movieFrameStyling.css';

const actorsData = [
  {
    question: 'What movie is this frame from?',
    a: '',
    b: 'Inception ',
    c: '',
    d: '',
    correct: 'b',
    imgSource: '../src/movieFrames/inception.jpg',
  },
  {
    question: 'What movie is this frame from?',
    a: '',
    b: '',
    c: 'Interstellar ',
    d: '',
    correct: 'c',
    imgSource: '../src/movieFrames/interstellar.jpg',
  },
  {
    question: 'What movie is this frame from?',
    a: '',
    b: '',
    c: 'Rango ',
    d: '',
    correct: 'c',
    imgSource: '../src/movieFrames/rango.jpg',
  },
  {
    question: 'What movie is this frame from?',
    a: 'Saturday Night Fever ',
    b: '',
    c: '',
    d: '',
    correct: 'a',
    imgSource: '../src/movieFrames/saturdayNightFever.jpg',
  },
  {
    question: 'What movie is this frame from?',
    a: 'The Godfather ',
    b: '',
    c: '',
    d: '',
    correct: 'a',
    imgSource: '../src/movieFrames/theGodfather.jpg',
  },
  {
    question: 'What movie is this frame from?',
    a: '',
    b: '',
    c: 'The Hangover ',
    d: '',
    correct: 'c',
    imgSource: '../src/movieFrames/theHangover.jpg',
  },
  {
    question: 'What movie is this frame from?',
    a: '',
    b: '',
    c: '',
    d: 'The Matrix ',
    correct: 'd',
    imgSource: '../src/movieFrames/theMatrix.jpg',
  },
  {
    question: 'What movie is this frame from?',
    a: 'Thor: Ragnarok ',
    b: '',
    c: '',
    d: '',
    correct: 'a',
    imgSource: '../src/movieFrames/thorRagnarok.jpg',
  },
  {
    question: 'What movie is this frame from?',
    a: '',
    b: '',
    c: 'Uncut Gems ',
    d: '',
    correct: 'c',
    imgSource: '../src/movieFrames/UncutGems.jpg',
  },
  {
    question: 'What movie is this frame from?',
    a: '',
    b: '',
    c: '',
    d: 'WALL·E ',
    correct: 'd',
    imgSource: '../src/movieFrames/wallE.jpg',
  },
  {
    question: 'What movie is this frame from?',
    a: 'The Wolf of Wall Street ',
    b: '',
    c: '',
    d: '',
    correct: 'a',
    imgSource: '../src/movieFrames/WallStWolf.jpg',
  },
];

// Array that will store incvalid movie frame answers
let wrongAnswers = [];

// API key:
// `https://api.themoviedb.org/3/movie/top_rated?api_key=e0add4835a4a4c34f08aeb4c32425f01&language=en-US&page=${pageNumber}`,

async function getDataFromDb(pageNumber) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=e0add4835a4a4c34f08aeb4c32425f01&language=en-US&page=${pageNumber}`
  );
  const data = await response.json();
  return data;
}

const quiz = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const answerElements = document.querySelectorAll('.answer');
const a_text = document.getElementById('a-text');
const b_text = document.getElementById('b-text');
const c_text = document.getElementById('c-text');
const d_text = document.getElementById('d-text');
const submitBtn = document.getElementById('submit');

// Choosing movie frame box and appending the photo to it
const movieFrameBox = document.querySelector('.movieFrameBox');
const frameImg = document.createElement('img');
movieFrameBox.append(frameImg);

let currentQuestion = 0;
let score = 0;

// Getting info from API for movie names
async function loadWrongMovieNames() {
  // Making 8 different calls to API because single one contains only 20 movie names
  for (let i = 1; i <= 8; i++) {
    // Making sure that every API call returns data, otherwise showing error image and message
    // eslint-disable-next-line no-await-in-loop
    const data = await getDataFromDb(i).catch((e) => {
      questionElement.innerHTML = 'Sorry, our database could not be reached, refresh the page and try another quiz :)';
      frameImg.src = './src/movieFrames/error.jpeg';
      answerElements.forEach((answerElement) => {
        // eslint-disable-next-line no-param-reassign
        answerElement.style.display = 'none';
      });
      return e;
    });
    // Filtering array to have movies only in English
    let wrongAnswersFromThisLoop = data.results.map((arr) => {
      if (arr.original_language === 'en') {
        return arr.original_title;
      }
    });

    // Getting rid of all non-English deleted movies turned to "undefined"
    wrongAnswersFromThisLoop = wrongAnswersFromThisLoop.filter((x) => x !== undefined);

    // Adding current API call to overall wrongAnswers array
    wrongAnswers = wrongAnswers.concat(wrongAnswersFromThisLoop);
  }

  // Randomizing wrong answers order
  wrongAnswers = wrongAnswers.sort(() => Math.random() - 0.5);

  // Function returns array with invalid movie names
  return wrongAnswers;
}
loadWrongMovieNames().catch((e) => {
  // eslint-disable-next-line no-unused-expressions
  `We were not able to load this quiz for You because of error: ${e}`;
  throw new Error(`Error outside of the function! ${e}`);
});

function deselectInputs() {
  answerElements.forEach((answerEl) => {
    // eslint-disable-next-line no-param-reassign
    answerEl.checked = false;
  });
}

function loadQuiz() {
  deselectInputs();

  const currentQuizData = actorsData[currentQuestion];

  // Adding source to image on the page
  frameImg.src = currentQuizData.imgSource;
  questionElement.innerHTML = currentQuizData.question;

  // Making a, b, c, d options display as the correct answer or random wrong answer + making sure that displayed names are not repeating
  a_text.innerHTML = currentQuizData.a || wrongAnswers[Math.floor(Math.random() * 91)];
  do {
    b_text.innerHTML = currentQuizData.b || wrongAnswers[Math.floor(Math.random() * 91)];
  } while (b_text.innerHTML === a_text.innerHTML);
  do {
    c_text.innerHTML = currentQuizData.c || wrongAnswers[Math.floor(Math.random() * 91)];
  } while (c_text.innerHTML === a_text.innerHTML || c_text.innerHTML === b_text.innerHTML);
  do {
    d_text.innerHTML = currentQuizData.d || wrongAnswers[Math.floor(Math.random() * 91)];
  } while (
    d_text.innerHTML === a_text.innerHTML ||
    d_text.innerHTML === b_text.innerHTML ||
    d_text.innerHTML === c_text.innerHTML
  );
}

// Loading quiz with a little delay, so the API with movie names can be fetched. <-- we can later berak this js file to smaller pieces and load the array at startup of the whole web app
window.setTimeout(loadQuiz, 150);

function selectAnswer() {
  let answer;

  answerElements.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

submitBtn.addEventListener('click', () => {
  const answer = selectAnswer();

  if (answer) {
    if (answer === actorsData[currentQuestion].correct) {
      // eslint-disable-next-line no-plusplus
      score++;
    }

    // eslint-disable-next-line no-plusplus
    currentQuestion++;

    if (currentQuestion < actorsData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `<h2>Your final score is: ${score} / ${actorsData.length}</h2><button onClick="location.reload()">Reload</button>`;
    }
  }
});

/*
  TIMER (from Ada)
*/
// 7 images of film plates
let COUNTER = 7;

// variable for clearing setInterval()
let interval;

function changeTimerImage() {
  const imageSrc = document.getElementById('timer-image').src;
  const index = imageSrc.lastIndexOf('.png');

  if (COUNTER > 0) {
    // replacing the number in the image "src" string
    const imageSrcText = imageSrc.substring(0, index - 1) + COUNTER + imageSrc.substring(index);

    // replacing image "src" attribute with a new value
    document.getElementById('timer-image').src = imageSrcText;

    COUNTER--;
  } else {
    console.log('Next question!');
    clearInterval(interval);
  }
}

function timer() {
  interval = setInterval(changeTimerImage, 1000);
}

timer();
