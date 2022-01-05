/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */

import '../styles/actors.css';
import '../styles/quizResult.css';
import '../styles/movieFrameStyling.css';
import '../styles/style.css';

import { shuffleArray } from './modules/shuffleArray';
import { navSlide } from './modules/hamburger';

import { actorsData } from './pages/actors';
import { movieFramesData } from './pages/frames';
import { soundsData } from './pages/sounds';

const quiz = document.getElementById('quiz');
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

// Choosing movie frame box and appending the photo to it
const movieFrameBox = document.querySelector('.movieFrameBox');
const frameImg = document.createElement('img');
movieFrameBox.append(frameImg);

const containerToHide = document.querySelector('#containerToHide');
const homeContainer = document.querySelector('.home-container');
const actorsAndMovieQuestionsElements = document.querySelector('.actors-and-movie-questions-elements');
const soundtracksQuestionsElements = document.querySelector('.soundtracks-question-elements');

// Hamburger navigation
navSlide();

const quizData = {
  actors: actorsData,
  frames: movieFramesData,
  soundtracks: soundsData,
};

const state = {
  currentQuizData: null,
  currentQuestion: 0,
  score: 0,
};

function initQuiz(name) {
  // przypisanie odpowiednich pytań
  const questionsToBeMixed = quizData[name];

  // pomieszanie odpowiedzi
  shuffleArray(questionsToBeMixed);
  state.currentQuizData = questionsToBeMixed;

  // odpalenie quizu
  loadQuiz();

  // rozpoczęcie timera
  if (actorsAndMovieQuestionsElements.hidden === false) {
    // Add source to image on the page
    timer();
  } // if quiz requires sound file, load it
  else if (soundtracksQuestionsElements.hidden === false) {
    playBtn.addEventListener('click', function () {
      soundItem.play();
      setTimeout(timer, 10000);
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
    clearInterval(interval);
    endQuiz();
  }

  // startujemy timer
  if (actorsAndMovieQuestionsElements.hidden === false) {
    // Add source to image on the page
    timer();
  } // if quiz requires sound file, load it
  else if (soundtracksQuestionsElements.hidden === false) {
    let imageSrcText = window.location.origin + '/assets/timer/10.png';
    document.getElementById('timer-image').src = imageSrcText;
    playBtn.addEventListener('click', function () {
      soundItem.play();
      setTimeout(timer, 10000);
      clearInterval(interval);
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
  if (actorsAndMovieQuestionsElements.hidden === false) {
    // Add source to image on the page
    frameImg.src = loadQuizQuizData.imgSource;
  } // if quiz requires sound file, load it
  else if (soundtracksQuestionsElements.hidden === false) {
    console.log(loadQuizQuizData);
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
  quiz.innerHTML = `<div class="container-end">
      <div class="table-score">
      <div>
      <h1>Your final score is: ${state.score} / ${state.currentQuizData.length}</h1>
          <div class="buttons-container-end">
              <button><a href="../index.html" class="btn">Go Home</a></button>
              <h2>Share your score:</h2>
              <div class="share-btn-container">
                <a href="#" target="_blank" class="facebook-btn">
                  <i class="fab fa-facebook"></i>
                </a>
                <a href="#" target="_blank" class="twitter-btn">
                  <i class="fab fa-twitter"></i>
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

function changeTimerImage() {
  let imageSrc = document.getElementById('timer-image').src;
  // const index = imageSrc.lastIndexOf('.png');
  const index = imageSrc.lastIndexOf('.png');

  if (counter >= 0) {
    // replacing the number in the image "src" string
    let imageSrcText = window.location.origin + '/assets/timer/' + counter + '.png';

    // replacing image "src" attribute with a new value
    document.getElementById('timer-image').src = imageSrcText;

    counter--;

    if (counter) {
      submitBtn.removeAttribute('disabled');
    } else {
      submitBtn.setAttribute('disabled', 'disabled');
    }
  } else {
    clearInterval(interval);
    nextQuestion();
  }
}

navLinks.forEach((el) => {
  el.addEventListener('click', (e) => {
    // Remove classes
    navLinks.forEach((navLink) => {
      navLink.classList.remove('active');
    });

    // Add active class
    e.target.classList.add('active');

    state.currentQuestion = 0;
    state.score = 0;
    
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
