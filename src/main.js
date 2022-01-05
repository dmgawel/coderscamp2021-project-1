/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */

import '../styles/actors.css';
import '../styles/quizResult.css';
import '../styles/movieFrameStyling.css';
import '../styles/style.css';
import '../styles/soundtracksStyling.css';

import { shuffleArray } from './modules/shuffleArray';
import { navSlide } from './modules/hamburger';

import { actorsData } from './pages/actors';
import { movieFramesData } from './pages/frames';
import soundsData from './pages/sounds';

// Hamburger navigation
navSlide();

const htmlBody = document.querySelector('body');
const questionElement = document.getElementById('question');
const answerElements = document.querySelectorAll('.answer');
const a_text = document.getElementById('a-text');
const b_text = document.getElementById('b-text');
const c_text = document.getElementById('c-text');
const d_text = document.getElementById('d-text');
const submitBtn = document.getElementById('submit');
const navLinks = document.querySelectorAll('.js-quiz-target');

const ul = document.querySelector('.answers');

const soundItem = document.getElementById('sound');
const playBtn = document.getElementById('soundtrackplay');

const frameImg = document.querySelector('.movieFrameBox img');

const containerToHide = document.querySelector('#containerToHide');
const homeContainer = document.querySelector('.home-container');
const actorsAndMovieQuestionsElements = document.querySelector('.actors-and-movie-questions-elements');
const soundtracksQuestionsElements = document.querySelector('.soundtracks-question-elements');

const quizzes = {
  actors: {
    type: 'image',
    data: actorsData,
  },
  frames: {
    type: 'image',
    data: movieFramesData,
  },
  soundtracks: {
    type: 'sound',
    data: soundsData,
  },
};

const quizData = {
  actors: actorsData,
  frames: movieFramesData,
  soundtracks: soundsData,
};

const state = {
  currentQuiz: null,
  currentQuizData: null,
  currentQuestion: 0,
  score: 0,
  timerInterval: null,
  timerCounter: 10,
};

function initQuiz(name) {
  // reset numeru pytania oraz punktów gracza
  state.currentQuestion = 0;
  state.score = 0;

  // przypisanie odpowiednich pytań
  const questionsToBeMixed = [...quizData[name]];

  // pomieszanie odpowiedzi
  shuffleArray(questionsToBeMixed);

  state.currentQuizData = questionsToBeMixed;
  state.currentQuiz = name;

  // odpalenie quizu
  loadQuiz();

  // rozpoczęcie timera
  if (quizzes[state.currentQuiz].type === 'image') {
    // Add source to image on the page
    startTimer();
  } // if quiz requires sound file, load it
  else if (quizzes[state.currentQuiz].type === 'sound') {
    playBtn.addEventListener('click', function () {
      soundItem.play();
      soundItem.addEventListener('ended', () => {
        console.log('ended');
        startTimer();
      });
    });
  }
}

function nextQuestion() {
  // sprawdzamy czy dobra odpowiedź
  const answer = selectAnswer();

  if (answer === state.currentQuizData[state.currentQuestion].correct) {
    // eslint-disable-next-line no-plusplus
    state.score++;
  }

  // ustawiany state.currentQuestion na +1
  // eslint-disable-next-line no-plusplus
  state.currentQuestion++;

  // wyświetlamy kolejne pytanie (jeśli są, jeśli nie to endQuiz())
  if (state.currentQuestion < state.currentQuizData.length) {
    loadQuiz();
  } else {
    endQuiz();
  }

  // startujemy timer
  if (quizzes[state.currentQuiz].type === 'image') {
    // Add source to image on the page
    startTimer();
  } // if quiz requires sound file, load it
  else if (quizzes[state.currentQuiz].type === 'sound') {
    if (state.currentQuestion < state.currentQuizData.length) {
      const imageSrcText = window.location.origin + '/assets/timer/10.png';
      document.getElementById('timer-image').src = imageSrcText;
    }
    playBtn.addEventListener('click', function () {
      soundItem.play();
      soundItem.addEventListener('ended', () => {
        startTimer();
      });
    });
  }
}

/**
 * Logika
 *
 * Po wybraniu quizu ustawiany stan na podstawie danych o quizie
 */

// Array that will store invalid movie frame answers
let wrongAnswers = [];

// async function getDataFromDb(pageNumber) {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/movie/top_rated?api_key=e0add4835a4a4c34f08aeb4c32425f01&language=en-US&page=${pageNumber}`
//   );
//   const data = await response.json();
//   return data;
// }

// ! fetch commented out
// // Getting info from API for movie names
// async function loadWrongMovieNames() {
//   // Making 8 different calls to API because single one contains only 20 movie names
//   for (let i = 1; i <= 8; i++) {
//     // Making sure that every API call returns data, otherwise showing error image and message
//     // eslint-disable-next-line no-await-in-loop
//     const data = await getDataFromDb(i).catch((e) => {
//       questionElement.innerHTML = 'Sorry, our database could not be reached, refresh the page and try another quiz :)';
//       frameImg.src = './src/movieFrames/error.jpeg';
//       answerElements.forEach((answerElement) => {
//         // eslint-disable-next-line no-param-reassign
//         answerElement.style.display = 'none';
//       });
//       return e;
//     });
//     // Filtering array so it contains only movies in English
//     let wrongAnswersFromThisLoop = data.results.map((arr) => {
//       if (arr.original_language === 'en') {
//         return arr.original_title;
//       }
//     });

//     // Getting rid of all non-English deleted movies turned to "undefined"
//     wrongAnswersFromThisLoop = wrongAnswersFromThisLoop.filter((x) => x !== undefined);

//     // Adding current API call to overall wrongAnswers array
//     wrongAnswers = wrongAnswers.concat(wrongAnswersFromThisLoop);
//   }

//   // Randomizing wrong answers order
//   wrongAnswers = wrongAnswers.sort(() => Math.random() - 0.5);

//   // Function returns array with invalid movie names
//   return wrongAnswers;
// }
// loadWrongMovieNames().catch((e) => {
//   // eslint-disable-next-line no-unused-expressions
//   `We were not able to load this quiz for You because of error: ${e}`;
//   throw new Error(`Error outside of the function! ${e}`);
// });

function deselectInputs() {
  answerElements.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

function loadQuiz() {
  deselectInputs();

  const loadQuizQuizData = state.currentQuizData[state.currentQuestion];

  // If quiz requires image, load it
  if (quizzes[state.currentQuiz].type === 'image') {
    // Add source to image on the page
    frameImg.src = loadQuizQuizData.imgSource;
  } // if quiz requires sound file, load it
  else if (quizzes[state.currentQuiz].type === 'sound') {
    soundItem.src = loadQuizQuizData.soundSource;
  }

  questionElement.innerHTML = loadQuizQuizData.question;

  a_text.innerHTML = loadQuizQuizData.a;
  b_text.innerHTML = loadQuizQuizData.b;
  c_text.innerHTML = loadQuizQuizData.c;
  d_text.innerHTML = loadQuizQuizData.d;

  // // Making a, b, c, d options display as the correct answer or random wrong answer + making sure that displayed names are not repeating
  // a_text.innerHTML = loadQuizQuizData.a || wrongAnswers[Math.floor(Math.random() * 91)];
  // do {
  //   b_text.innerHTML = loadQuizQuizData.b || wrongAnswers[Math.floor(Math.random() * 91)];
  // } while (b_text.innerHTML === a_text.innerHTML);
  // do {
  //   c_text.innerHTML = loadQuizQuizData.c || wrongAnswers[Math.floor(Math.random() * 91)];
  // } while (c_text.innerHTML === a_text.innerHTML || c_text.innerHTML === b_text.innerHTML);
  // do {
  //   d_text.innerHTML = loadQuizQuizData.d || wrongAnswers[Math.floor(Math.random() * 91)];
  // } while (
  //   d_text.innerHTML === a_text.innerHTML ||
  //   d_text.innerHTML === b_text.innerHTML ||
  //   d_text.innerHTML === c_text.innerHTML
  // );
  // Randomizing order of ABCD answers
  for (let i = ul.children.length; i >= 0; i--) {
    // eslint-disable-next-line no-bitwise
    ul.appendChild(ul.children[(Math.random() * i) | 0]);
  }
}

function selectAnswer() {
  let answer;

  answerElements.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function endQuiz() {
  clearTimer();

  htmlBody.innerHTML = `<div class="container-end">
      <div class="table-score">
      <div>
      <h1>Your final score is: ${state.score} / ${state.currentQuizData.length}</h1>
          <div class="buttons-container-end">
              <button><a href="../index.html" class="btn">Go Home</a></button>
              <h2>Share your score:</h2>
              <div class="share-btn-container">
                <a href="#" target="_blank" class="facebook-btn">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" width="48px" height="48px">
                <g id="surface22142389">
                <path style=" stroke:none;fill-rule:nonzero;fill:rgb(9.411765%,46.666667%,94.901961%);fill-opacity:1;" d="M 24 5 C 13.507812 5 5 13.507812 5 24 C 5 34.492188 13.507812 43 24 43 C 34.492188 43 43 34.492188 43 24 C 43 13.507812 34.492188 5 24 5 Z M 24 5 "/>
                <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 26.570312 29.035156 L 31.488281 29.035156 L 32.261719 24.039062 L 26.570312 24.039062 L 26.570312 21.3125 C 26.570312 19.234375 27.25 17.394531 29.191406 17.394531 L 32.308594 17.394531 L 32.308594 13.035156 C 31.761719 12.964844 30.601562 12.800781 28.410156 12.800781 C 23.839844 12.800781 21.15625 15.214844 21.15625 20.71875 L 21.15625 24.039062 L 16.457031 24.039062 L 16.457031 29.035156 L 21.15625 29.035156 L 21.15625 42.765625 C 22.089844 42.90625 23.03125 43 24 43 C 24.875 43 25.730469 42.921875 26.570312 42.804688 Z M 26.570312 29.035156 "/>
                </g>
                </svg>
                </a>
                <a href="#" target="_blank" class="twitter-btn">
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"/></svg>
                </a>
              </div>
          </div>
      </div>
   </div>`;

  const facebookBtn = document.querySelector('.facebook-btn');
  const twitterBtn = document.querySelector('.twitter-btn');

  const postUrl = encodeURI(document.location.href);
  const postTitle = encodeURI(
    `Hello everyone! I have scored ${state.score}/${state.currentQuizData.length} points! Check out this quiz: `
  );

  facebookBtn.setAttribute('href', `https://www.facebook.com/sharer.php?u=${postUrl}`);

  twitterBtn.setAttribute('href', `https://twitter.com/share?url=${postUrl}&text=${postTitle}`);
}

submitBtn.addEventListener('click', nextQuestion);

/*
  TIMER
*/
function renderTimer() {
  // replacing the number in the image "src" string
  const imageSrcText = `/assets/timer/${state.timerCounter}.png`;

  // replacing image "src" attribute with a new value
  document.querySelectorAll('.timer-box > img').forEach((el) => {
    el.src = imageSrcText;
  });
}

function countdownTimer() {
  state.timerCounter--;

  if (state.timerCounter === 0) {
    clearTimer();
    nextQuestion();
  } else {
    renderTimer();
  }
}

function clearTimer() {
  clearInterval(state.timerInterval);
  state.timerCounter = 10;
  renderTimer();
}

function startTimer() {
  clearTimer();
  state.timerInterval = setInterval(countdownTimer, 1000);
}

// 7 images of film plates
const TIMER_START_VALUE = 10;
let counter = TIMER_START_VALUE;

// variable for clearing setInterval()
let interval;

function timer() {
  if (interval) {
    counter = TIMER_START_VALUE;
    clearInterval(interval);
    changeTimerImage();
    interval = setInterval(changeTimerImage, 1000);
  } else {
    changeTimerImage();
    interval = setInterval(changeTimerImage, 1000);
  }
}

navLinks.forEach((el) => {
  el.addEventListener('click', (e) => {
    clearTimer();
    renderTimer();

    // Remove classes
    navLinks.forEach((navLink) => {
      navLink.classList.remove('active');
    });

    // Add active class
    e.target.classList.add('active');

    const name = el.dataset.target;
    containerToHide.hidden = false;
    homeContainer.hidden = true;
    if (name === 'soundtracks') {
      actorsAndMovieQuestionsElements.hidden = true;
      soundtracksQuestionsElements.hidden = false;
    } else {
      soundtracksQuestionsElements.hidden = true;
      actorsAndMovieQuestionsElements.hidden = false;
    }

    initQuiz(name);
    // console.log(quizData[name]);
  });
});

/* ! do soundtrack musimy zająć się:
klasa soundtracks-question-elements - zdjąć hidden


*/
